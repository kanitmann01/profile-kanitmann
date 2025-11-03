import { articles } from "@/data/articles"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanit.codes"

export async function GET() {
  const items = articles
    .slice()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
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
      const url = new URL(item.canonicalPath, siteUrl).toString()
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
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
    },
  })
}


