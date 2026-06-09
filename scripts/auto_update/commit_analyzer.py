import os
import sys
from datetime import datetime, timedelta, timezone
from typing import Dict, List, Set, Tuple

try:
    import requests
except ImportError:
    print("Error: requests library not installed. Run: pip install requests")
    sys.exit(1)

GITHUB_API_BASE = "https://api.github.com"
DEFAULT_USER = "kanitmann01"


def _get_headers() -> Dict[str, str]:
    headers = {"Accept": "application/vnd.github.v3+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"token {token}"
    return headers


def fetch_user_commits(username: str, days: int = 30) -> List[dict]:
    since = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
    url = f"{GITHUB_API_BASE}/users/{username}/events"
    all_commits: List[dict] = []
    page = 1
    per_page = 100

    while True:
        try:
            resp = requests.get(
                url,
                headers=_get_headers(),
                params={"per_page": per_page, "page": page},
                timeout=30,
            )
        except Exception as e:
            print(f"Warning: request error fetching commits: {e}", file=sys.stderr)
            return []

        if resp.status_code == 403:
            print("Warning: GitHub API rate limit exceeded.", file=sys.stderr)
            return []
        if resp.status_code != 200:
            print(f"Warning: GitHub API returned {resp.status_code}.", file=sys.stderr)
            return []

        events = resp.json()
        if not events:
            break

        for event in events:
            if event.get("type") != "PushEvent":
                continue
            pushed_at = event.get("pushed_at", "")
            if pushed_at and pushed_at < since:
                continue
            repo_full_name = event.get("repo", {}).get("name", "")
            payload = event.get("payload", {})
            commits_in_event = payload.get("commits", [])
            for c in commits_in_event:
                all_commits.append({
                    "sha": c.get("sha", ""),
                    "commit": {
                        "author": {"date": pushed_at},
                        "message": c.get("message", ""),
                    },
                    "repository": {
                        "name": repo_full_name.split("/")[-1] if repo_full_name else "",
                        "full_name": repo_full_name,
                        "language": None,
                    },
                })

        if len(events) < per_page:
            break
        page += 1
        if page > 3:
            break

    return all_commits


def fetch_repo_languages(repo_full_name: str) -> Dict[str, int]:
    url = f"{GITHUB_API_BASE}/repos/{repo_full_name}/languages"
    try:
        resp = requests.get(url, headers=_get_headers(), timeout=30)
    except Exception as e:
        print(f"Warning: request error fetching languages for {repo_full_name}: {e}", file=sys.stderr)
        return {}

    if resp.status_code != 200:
        return {}
    return resp.json()


def filter_commits_by_date(commits: List[dict], days: int = 30) -> List[dict]:
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    filtered = []
    for c in commits:
        date_str = c.get("commit", {}).get("author", {}).get("date", "")
        if not date_str:
            continue
        try:
            date_str_clean = date_str.replace("Z", "+00:00")
            commit_date = datetime.fromisoformat(date_str_clean)
            if commit_date.tzinfo is None:
                commit_date = commit_date.replace(tzinfo=timezone.utc)
            if commit_date >= cutoff:
                filtered.append(c)
        except (ValueError, TypeError):
            continue
    return filtered


def group_commits_by_repo(commits: List[dict]) -> Dict[str, dict]:
    grouped: Dict[str, dict] = {}
    for c in commits:
        repo = c.get("repository", {})
        full_name = repo.get("full_name", "")
        if not full_name:
            continue
        if full_name not in grouped:
            grouped[full_name] = {
                "name": repo.get("name", full_name.split("/")[-1]),
                "count": 0,
                "language": repo.get("language") or "Unknown",
            }
        grouped[full_name]["count"] += 1
        if repo.get("language") and grouped[full_name]["language"] == "Unknown":
            grouped[full_name]["language"] = repo["language"]
    return grouped


def format_markdown(grouped: Dict[str, dict], languages: Set[str], days: int = 30) -> str:
    lines: List[str] = []
    lines.append("## \U0001f528 What I've Been Building")
    lines.append("")
    lines.append(f"*Last {days} days*")
    lines.append("")

    if not grouped:
        lines.append("No recent activity to report.")
        lines.append("")
        return "\n".join(lines)

    sorted_repos = sorted(grouped.items(), key=lambda x: x[1]["count"], reverse=True)

    lines.append("### Active Repositories")
    lines.append("")
    for full_name, info in sorted_repos:
        count = info["count"]
        name = info["name"]
        lang = info.get("language", "Unknown")
        lines.append(f"- **{name}** \u2014 {count} commit{'s' if count != 1 else ''} ({lang})")
    lines.append("")

    if languages:
        lines.append("### Languages")
        lines.append("")
        lines.append(", ".join(sorted(languages)))
        lines.append("")

    return "\n".join(lines)


def analyze_recent_commits(username: str = DEFAULT_USER, days: int = 30) -> str:
    commits = fetch_user_commits(username, days=days)
    filtered = filter_commits_by_date(commits, days=days)
    grouped = group_commits_by_repo(filtered)

    languages: Set[str] = set()
    for full_name in grouped:
        langs = fetch_repo_languages(full_name)
        if langs:
            languages.update(langs.keys())
        else:
            lang = grouped[full_name].get("language")
            if lang and lang != "Unknown":
                languages.add(lang)

    return format_markdown(grouped, languages, days=days)


if __name__ == "__main__":
    username = os.environ.get("GITHUB_USER", DEFAULT_USER)
    print(analyze_recent_commits(username))
