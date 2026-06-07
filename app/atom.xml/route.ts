import { getSortedArticles, getArticleUrl, getSiteUrl, feedHeaders } from "@/lib/feed-generator"

export async function GET() {
  const items = getSortedArticles()
  const siteUrl = getSiteUrl()
  const updated = new Date().toISOString()

  const feedId = `${siteUrl}/atom.xml`

  const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Kanit Mann - Articles</title>
  <id>${feedId}</id>
  <updated>${updated}</updated>
  <link href="${siteUrl}/articles"/>
  <link href="${feedId}" rel="self"/>
  <author>
    <name>Kanit Mann</name>
    <uri>${siteUrl}</uri>
  </author>
  ${items
    .map((item) => {
      const url = getArticleUrl(item.canonicalPath)
      const updatedItem = new Date(item.publishedAt).toISOString()
      return `
  <entry>
    <title><![CDATA[${item.title}]]></title>
    <id>${url}</id>
    <link href="${url}"/>
    <updated>${updatedItem}</updated>
    <summary type="html"><![CDATA[${item.summary}]]></summary>
  </entry>`
    })
    .join("\n")}
</feed>`

  return new Response(atom, {
    headers: feedHeaders.atom,
  })
}


