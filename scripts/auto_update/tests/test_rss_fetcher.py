from unittest.mock import patch, MagicMock
from datetime import datetime
import pytest

from rss_fetcher import (
    fetch_latest_posts,
    parse_feed,
    format_posts_markdown,
    RSS_FEED_URL,
    MAX_POSTS,
)


SAMPLE_RSS_XML = """<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>kanit.codes</title>
    <link>https://kanit.codes</link>
    <description>Blog</description>
    <item>
      <title>Oldest Post</title>
      <link>https://kanit.codes/blog/oldest</link>
      <description>Oldest description</description>
      <pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Newest Post</title>
      <link>https://kanit.codes/blog/newest</link>
      <description>Newest description</description>
      <pubDate>Wed, 01 May 2024 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Middle Post</title>
      <link>https://kanit.codes/blog/middle</link>
      <description>Middle description</description>
      <pubDate>Fri, 01 Mar 2024 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Fourth Post</title>
      <link>https://kanit.codes/blog/fourth</link>
      <description>Fourth description</description>
      <pubDate>Sat, 01 Feb 2025 00:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>"""


def _mock_feed(entries):
    feed = MagicMock()
    feed.entries = entries
    return feed


def _make_entry(title, link, summary, published):
    entry = MagicMock()
    entry.title = title
    entry.link = link
    entry.summary = summary
    entry.published = published
    return entry


class TestParseFeed:
    def test_parses_entries(self):
        feed = _mock_feed([
            _make_entry("Post 1", "https://kanit.codes/blog/1", "Desc 1", "Wed, 01 May 2024 00:00:00 GMT"),
            _make_entry("Post 2", "https://kanit.codes/blog/2", "Desc 2", "Mon, 01 Jan 2024 00:00:00 GMT"),
        ])
        result = parse_feed(feed)
        assert len(result) == 2
        assert result[0]["title"] == "Post 1"
        assert result[0]["link"] == "https://kanit.codes/blog/1"

    def test_sorts_by_date_newest_first(self):
        feed = _mock_feed([
            _make_entry("Old", "https://kanit.codes/blog/old", "d", "Mon, 01 Jan 2024 00:00:00 GMT"),
            _make_entry("New", "https://kanit.codes/blog/new", "d", "Wed, 01 May 2024 00:00:00 GMT"),
            _make_entry("Mid", "https://kanit.codes/blog/mid", "d", "Fri, 01 Mar 2024 00:00:00 GMT"),
        ])
        result = parse_feed(feed)
        assert result[0]["title"] == "New"
        assert result[1]["title"] == "Mid"
        assert result[2]["title"] == "Old"

    def test_empty_feed(self):
        feed = _mock_feed([])
        result = parse_feed(feed)
        assert result == []

    def test_entry_missing_date(self):
        entry = _make_entry("No Date", "https://kanit.codes/blog/nodate", "d", None)
        feed = _mock_feed([entry])
        result = parse_feed(feed)
        assert len(result) == 1
        assert result[0]["date"] == ""

    def test_entry_missing_summary(self):
        entry = _make_entry("No Summary", "https://kanit.codes/blog/nosum", None, "Wed, 01 May 2024 00:00:00 GMT")
        feed = _mock_feed([entry])
        result = parse_feed(feed)
        assert result[0]["description"] == ""


class TestFormatPostsMarkdown:
    def test_formats_three_posts(self):
        posts = [
            {"title": "Post A", "link": "https://kanit.codes/blog/a", "date": "May 1, 2024", "description": "Desc A"},
            {"title": "Post B", "link": "https://kanit.codes/blog/b", "date": "Mar 1, 2024", "description": "Desc B"},
            {"title": "Post C", "link": "https://kanit.codes/blog/c", "date": "Jan 1, 2024", "description": "Desc C"},
        ]
        md = format_posts_markdown(posts)
        assert "📝 Latest Blog Posts" in md
        assert "[Post A](https://kanit.codes/blog/a)" in md
        assert "[Post B](https://kanit.codes/blog/b)" in md
        assert "[Post C](https://kanit.codes/blog/c)" in md
        assert "May 1, 2024" in md

    def test_formats_single_post(self):
        posts = [{"title": "Solo", "link": "https://kanit.codes/blog/solo", "date": "Jan 1, 2024", "description": ""}]
        md = format_posts_markdown(posts)
        assert "📝 Latest Blog Posts" in md
        assert "[Solo](https://kanit.codes/blog/solo)" in md

    def test_empty_posts(self):
        md = format_posts_markdown([])
        assert md == ""

    def test_limits_to_max_posts(self):
        posts = [
            {"title": f"Post {i}", "link": f"https://kanit.codes/blog/{i}", "date": f"Jan {i}, 2024", "description": ""}
            for i in range(10)
        ]
        md = format_posts_markdown(posts)
        for i in range(MAX_POSTS):
            assert f"[Post {i}]" in md
        for i in range(MAX_POSTS, 10):
            assert f"[Post {i}]" not in md


class TestFetchLatestPosts:
    @patch("rss_fetcher.feedparser.parse")
    @patch("rss_fetcher.requests.get")
    def test_successful_fetch(self, mock_get, mock_parse):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.text = SAMPLE_RSS_XML
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        entries = [
            _make_entry("Oldest Post", "https://kanit.codes/blog/oldest", "Oldest description", "Mon, 01 Jan 2024 00:00:00 GMT"),
            _make_entry("Newest Post", "https://kanit.codes/blog/newest", "Newest description", "Wed, 01 May 2024 00:00:00 GMT"),
            _make_entry("Middle Post", "https://kanit.codes/blog/middle", "Middle description", "Fri, 01 Mar 2024 00:00:00 GMT"),
            _make_entry("Fourth Post", "https://kanit.codes/blog/fourth", "Fourth description", "Sat, 01 Feb 2025 00:00:00 GMT"),
        ]
        mock_parse.return_value = _mock_feed(entries)

        md = fetch_latest_posts()
        assert "📝 Latest Blog Posts" in md
        assert "[Fourth Post]" in md
        assert "[Newest Post]" in md
        assert "[Middle Post]" in md
        assert "[Oldest Post]" not in md

    @patch("rss_fetcher.requests.get")
    def test_network_timeout(self, mock_get):
        import requests
        mock_get.side_effect = requests.exceptions.Timeout("Connection timed out")
        md = fetch_latest_posts()
        assert md == ""

    @patch("rss_fetcher.requests.get")
    def test_connection_error(self, mock_get):
        import requests
        mock_get.side_effect = requests.exceptions.ConnectionError("Connection refused")
        md = fetch_latest_posts()
        assert md == ""

    @patch("rss_fetcher.requests.get")
    def test_http_error(self, mock_get):
        import requests
        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_response.raise_for_status.side_effect = requests.exceptions.HTTPError("500 Server Error")
        mock_get.return_value = mock_response
        md = fetch_latest_posts()
        assert md == ""

    @patch("rss_fetcher.feedparser.parse")
    @patch("rss_fetcher.requests.get")
    def test_malformed_rss(self, mock_get, mock_parse):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.text = "not xml at all <<<>>>"
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        import feedparser
        bad_feed = feedparser.parse("not xml at all <<<>>>")
        mock_parse.return_value = bad_feed

        md = fetch_latest_posts()
        assert md == ""

    @patch("rss_fetcher.feedparser.parse")
    @patch("rss_fetcher.requests.get")
    def test_empty_rss_feed(self, mock_get, mock_parse):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.text = '<?xml version="1.0"?><rss version="2.0"><channel></channel></rss>'
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        import feedparser
        empty_feed = feedparser.parse('<?xml version="1.0"?><rss version="2.0"><channel></channel></rss>')
        mock_parse.return_value = empty_feed

        md = fetch_latest_posts()
        assert md == ""

    @patch("rss_fetcher.requests.get")
    def test_request_exception(self, mock_get):
        mock_get.side_effect = Exception("Unexpected error")
        md = fetch_latest_posts()
        assert md == ""
