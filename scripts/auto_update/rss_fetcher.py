import sys
import os
from datetime import datetime
from email.utils import parsedate_to_datetime

import requests
import feedparser

RSS_FEED_URL = "https://kanit.codes/rss.xml"
MAX_POSTS = 3
REQUEST_TIMEOUT = 15


def parse_feed(feed):
    entries = []
    for entry in feed.entries:
        date_str = ""
        parsed_date = None
        raw_date = getattr(entry, "published", None)
        if raw_date:
            try:
                parsed_date = parsedate_to_datetime(raw_date)
                date_str = parsed_date.strftime("%b %d, %Y")
            except Exception:
                date_str = ""

        entries.append({
            "title": getattr(entry, "title", ""),
            "link": getattr(entry, "link", ""),
            "description": getattr(entry, "summary", "") or "",
            "date": date_str,
            "_parsed_date": parsed_date,
        })

    entries.sort(key=lambda e: e["_parsed_date"] or datetime.min, reverse=True)
    return entries


def format_posts_markdown(posts):
    if not posts:
        return ""

    lines = ["## 📝 Latest Blog Posts", ""]
    for post in posts[:MAX_POSTS]:
        title = post["title"]
        link = post["link"]
        date = post["date"]
        lines.append(f"- [{title}]({link}) - {date}")

    lines.append("")
    return "\n".join(lines)


def fetch_latest_posts():
    try:
        response = requests.get(RSS_FEED_URL, timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
    except Exception:
        return ""

    try:
        feed = feedparser.parse(response.text)
        if not feed.entries:
            return ""

        entries = parse_feed(feed)
        if not entries:
            return ""

        return format_posts_markdown(entries)
    except Exception:
        return ""


if __name__ == "__main__":
    result = fetch_latest_posts()
    if result:
        print(result)
    else:
        print("Failed to fetch or parse RSS feed.", file=sys.stderr)
        sys.exit(1)
