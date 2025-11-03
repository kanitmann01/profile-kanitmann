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
      title: "Data Visualization Portfolio Reflection",
      description:
        "Five visualizations that document a semester-long journey toward professional polish, accessibility, and narrative clarity.",
      url: `${siteUrl}/articles/data-viz-analysis`,
      date: "2025-11-03",
    },
    {
      title: "Technical Blog 3: The Wonderful World of Windows Registry",
      description:
        "A corporate laptop story about registry tweaks, automation, and working within enterprise guardrails.",
      url: `${siteUrl}/articles/technical-blog-3`,
      date: "2025-09-21",
    },
    {
      title: "Technical Blog 2: Command Line Interface vs Graphical User Interface",
      description:
        "A practitioner’s take on choosing between CLI speed, GUI discovery, and the hybrid workflows that bridge them.",
      url: `${siteUrl}/articles/technical-blog-2`,
      date: "2025-09-14",
    },
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
        const pubDate = new Date(item.date).toUTCString()
        return `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${item.description}]]></description>
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


