import { articles } from "@/data/articles"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanit.codes"

export async function GET() {
  const items = articles
    .slice()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
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
        const url = new URL(item.canonicalPath, siteUrl).toString()
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
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
    },
  })
}


