const siteUrl = "https://kanit.codes"

type ArticleItem = {
  title: string
  description: string
  url: string
  date: string
}

function getArticles(): ArticleItem[] {
  return [
    {
      title: "CCRB Allegations Analysis (Ongoing)",
      description:
        "Multi-week data analysis project on CCRB allegations; Week 1 lays the baseline and links the first report.",
      url: `${siteUrl}/articles/ccrb-allegations-analysis`,
      date: "2025-09-08",
    },
    {
      title: "Would you have survived the Titanic?",
      description:
        "What this historic disaster reveals about inequality, decision-making, and leadership under pressure.",
      url: `${siteUrl}/articles/titanic-survival`,
      date: "2025-03-15",
    },
    {
      title: "Technical Blog 1: BIOS Issues and Ubuntu",
      description:
        "Troubleshooting BIOS/UEFI, Secure Boot, and firmware issues on Ubuntu—notes from a community thread and a practical checklist.",
      url: `${siteUrl}/articles/bios-issues-ubuntu`,
      date: "2025-09-08",
    },
  ]
}

export async function GET() {
  const items = getArticles()
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
      const updatedItem = new Date(item.date).toISOString()
      return `
  <entry>
    <title><![CDATA[${item.title}]]></title>
    <id>${item.url}</id>
    <link href="${item.url}"/>
    <updated>${updatedItem}</updated>
    <summary type="html"><![CDATA[${item.description}]]></summary>
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


