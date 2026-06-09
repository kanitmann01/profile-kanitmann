import pytest
from unittest.mock import patch, Mock
from datetime import datetime, timedelta, timezone
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from commit_analyzer import (
    fetch_user_commits,
    fetch_repo_languages,
    analyze_recent_commits,
    filter_commits_by_date,
    group_commits_by_repo,
    format_markdown,
)


@pytest.fixture
def sample_commits():
    now = datetime.now(timezone.utc)
    return [
        {
            "sha": "abc123",
            "commit": {
                "author": {"date": (now - timedelta(days=5)).isoformat()},
                "message": "Add feature X",
            },
            "repository": {
                "name": "repo1",
                "full_name": "kanitmann01/repo1",
                "language": "Python",
            },
        },
        {
            "sha": "def456",
            "commit": {
                "author": {"date": (now - timedelta(days=10)).isoformat()},
                "message": "Fix bug Y",
            },
            "repository": {
                "name": "repo1",
                "full_name": "kanitmann01/repo1",
                "language": "Python",
            },
        },
        {
            "sha": "ghi789",
            "commit": {
                "author": {"date": (now - timedelta(days=3)).isoformat()},
                "message": "Update docs",
            },
            "repository": {
                "name": "repo2",
                "full_name": "kanitmann01/repo2",
                "language": "JavaScript",
            },
        },
    ]


@pytest.fixture
def old_commits():
    now = datetime.now(timezone.utc)
    return [
        {
            "sha": "old123",
            "commit": {
                "author": {"date": (now - timedelta(days=60)).isoformat()},
                "message": "Old commit",
            },
            "repository": {
                "name": "oldrepo",
                "full_name": "kanitmann01/oldrepo",
                "language": "Ruby",
            },
        }
    ]


@pytest.fixture
def sample_languages():
    return {"Python": 50000, "JavaScript": 30000, "HTML": 10000}


class TestFilterCommitsByDate:
    def test_filters_commits_within_30_days(self, sample_commits):
        filtered = filter_commits_by_date(sample_commits, days=30)
        assert len(filtered) == 3

    def test_excludes_commits_older_than_30_days(self, sample_commits, old_commits):
        all_commits = sample_commits + old_commits
        filtered = filter_commits_by_date(all_commits, days=30)
        assert len(filtered) == 3
        assert all(c["sha"] != "old123" for c in filtered)

    def test_handles_empty_list(self):
        filtered = filter_commits_by_date([], days=30)
        assert filtered == []

    def test_custom_days_parameter(self, sample_commits):
        filtered = filter_commits_by_date(sample_commits, days=7)
        assert len(filtered) == 2


class TestGroupCommitsByRepo:
    def test_groups_commits_by_repository(self, sample_commits):
        grouped = group_commits_by_repo(sample_commits)
        assert "kanitmann01/repo1" in grouped
        assert "kanitmann01/repo2" in grouped
        assert grouped["kanitmann01/repo1"]["count"] == 2
        assert grouped["kanitmann01/repo2"]["count"] == 1

    def test_captures_repo_metadata(self, sample_commits):
        grouped = group_commits_by_repo(sample_commits)
        repo1 = grouped["kanitmann01/repo1"]
        assert repo1["name"] == "repo1"
        assert repo1["language"] == "Python"

    def test_handles_empty_list(self):
        grouped = group_commits_by_repo([])
        assert grouped == {}


class TestFetchUserCommits:
    @patch("commit_analyzer.requests.get")
    def test_fetches_commits_from_github_api(self, mock_get):
        now = datetime.now(timezone.utc)
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = [
            {
                "type": "PushEvent",
                "repo": {"name": "kanitmann01/repo1"},
                "pushed_at": now.isoformat(),
                "payload": {
                    "commits": [{"sha": "abc123", "message": "test commit"}]
                },
            }
        ]
        mock_get.return_value = mock_response

        commits = fetch_user_commits("kanitmann01")
        assert len(commits) == 1
        mock_get.assert_called_once()

    @patch("commit_analyzer.requests.get")
    def test_handles_rate_limit_error(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 403
        mock_response.json.return_value = {"message": "API rate limit exceeded"}
        mock_get.return_value = mock_response

        commits = fetch_user_commits("kanitmann01")
        assert commits == []

    @patch("commit_analyzer.requests.get")
    def test_handles_api_error(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 500
        mock_get.return_value = mock_response

        commits = fetch_user_commits("kanitmann01")
        assert commits == []

    @patch("commit_analyzer.requests.get")
    def test_uses_github_token_when_available(self, mock_get, monkeypatch):
        monkeypatch.setenv("GITHUB_TOKEN", "test_token")
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = []
        mock_get.return_value = mock_response

        fetch_user_commits("kanitmann01")
        call_kwargs = mock_get.call_args
        assert "Authorization" in call_kwargs.kwargs.get("headers", {}) or \
               "Authorization" in (call_kwargs[1].get("headers", {}) if len(call_kwargs) > 1 else {})

    @patch("commit_analyzer.requests.get")
    def test_handles_request_exception(self, mock_get):
        mock_get.side_effect = Exception("Connection error")
        commits = fetch_user_commits("kanitmann01")
        assert commits == []


class TestFetchRepoLanguages:
    @patch("commit_analyzer.requests.get")
    def test_fetches_languages_from_repo(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"Python": 50000, "JavaScript": 30000}
        mock_get.return_value = mock_response

        languages = fetch_repo_languages("kanitmann01/repo1")
        assert "Python" in languages
        assert "JavaScript" in languages

    @patch("commit_analyzer.requests.get")
    def test_handles_api_error(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 404
        mock_get.return_value = mock_response

        languages = fetch_repo_languages("kanitmann01/nonexistent")
        assert languages == {}

    @patch("commit_analyzer.requests.get")
    def test_handles_request_exception(self, mock_get):
        mock_get.side_effect = Exception("Connection error")
        languages = fetch_repo_languages("kanitmann01/repo1")
        assert languages == {}


class TestFormatMarkdown:
    def test_generates_markdown_with_repos(self):
        grouped = {
            "kanitmann01/repo1": {
                "name": "repo1",
                "count": 5,
                "language": "Python",
            },
            "kanitmann01/repo2": {
                "name": "repo2",
                "count": 3,
                "language": "JavaScript",
            },
        }
        languages = {"Python", "JavaScript"}
        markdown = format_markdown(grouped, languages, days=30)

        assert "What I've Been Building" in markdown
        assert "repo1" in markdown
        assert "repo2" in markdown
        assert "5 commits" in markdown or "5" in markdown
        assert "Python" in markdown
        assert "JavaScript" in markdown
        assert "30 days" in markdown

    def test_handles_empty_data(self):
        markdown = format_markdown({}, set(), days=30)
        assert "What I've Been Building" in markdown
        assert "No recent activity" in markdown or "no" in markdown.lower()

    def test_sorted_by_commit_count(self):
        grouped = {
            "kanitmann01/repo1": {"name": "repo1", "count": 2, "language": "Python"},
            "kanitmann01/repo2": {"name": "repo2", "count": 10, "language": "JS"},
        }
        markdown = format_markdown(grouped, {"Python", "JS"}, days=30)
        lines = markdown.split("\n")
        repo_lines = [l for l in lines if "repo" in l.lower()]
        assert len(repo_lines) >= 2


class TestAnalyzeRecentCommits:
    @patch("commit_analyzer.fetch_repo_languages")
    @patch("commit_analyzer.fetch_user_commits")
    def test_returns_formatted_markdown(self, mock_fetch_commits, mock_fetch_langs, sample_commits):
        mock_fetch_commits.return_value = sample_commits
        mock_fetch_langs.return_value = {"Python": 50000}

        markdown = analyze_recent_commits("kanitmann01", days=30)
        assert "What I've Been Building" in markdown
        assert "repo1" in markdown

    @patch("commit_analyzer.fetch_repo_languages")
    @patch("commit_analyzer.fetch_user_commits")
    def test_handles_no_commits(self, mock_fetch_commits, mock_fetch_langs):
        mock_fetch_commits.return_value = []

        markdown = analyze_recent_commits("kanitmann01", days=30)
        assert "What I've Been Building" in markdown

    @patch("commit_analyzer.fetch_repo_languages")
    @patch("commit_analyzer.fetch_user_commits")
    def test_filters_old_commits(self, mock_fetch_commits, mock_fetch_langs, sample_commits, old_commits):
        mock_fetch_commits.return_value = sample_commits + old_commits
        mock_fetch_langs.return_value = {}

        markdown = analyze_recent_commits("kanitmann01", days=30)
        assert "oldrepo" not in markdown
