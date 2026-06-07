import { getSortedArticles, getArticleUrl, getSiteUrl, feedHeaders } from "@/lib/feed-generator"

export async function GET() {
  const items = getSortedArticles()
  const siteUrl = getSiteUrl()
  const lastBuildDate = new Date().toUTCString()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Kanit Mann - Articles</title>
    <link>${siteUrl}/articles</link>
    <description>Articles and insights by Kanit Mann on data science and technology.</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <language>en-us</language>
    ${items
      .map((item) => {
        const url = getArticleUrl(item.canonicalPath)
        const pubDate = new Date(item.publishedAt).toUTCString()
        return `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${item.summary}]]></description>
    </item>`
      })
      .join("\n")}
  </channel>
</rss>`

  return new Response(rss, {
    headers: feedHeaders.rss,
  })
}


