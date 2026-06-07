# Copy Audit & Content Plan: Kanit Mann Portfolio

**Site:** `kanit.codes` — Personal portfolio (Next.js, Tailwind, shadcn/ui)  
**Owner:** Kanit Mann (Ken)  
**Audience:** Recruiters, hiring managers, data science/data engineering peers  
**Current positioning:** "Data Scientist & Product Builder"  
**LinkedIn positioning:** "Data Analyst | Data Engineer | Python, SQL, GCP, Tableau, ETL | Ex-Ericsson | Seeking Summer 2026"

---

## Audit Findings

| # | Issue | Dimension | Severity | Location |
|---|-------|-----------|----------|----------|
| 1 | Hero has no value prop — just name + title | Clarity | High | `components/hero.tsx:146-173` |
| 2 | "Building thoughtful solutions" — vague, no specific outcome | Impact | High | `components/footer.tsx:37` |
| 3 | "Building intelligent applications from data and cloud" repeated verbatim 4x across meta/OG/Twitter | Impact | Med | `app/layout.tsx:37,78,88` |
| 4 | "Data Scientist & Engineer" vs "Data Scientist & Product Builder" — inconsistent title across site | Clarity | Med | `layout.tsx:36` vs `hero.tsx:169-172` vs `footer.tsx:34` |
| 5 | "also known as Ken" — awkward phrasing | Clarity | Low | `components/hero.tsx:159` |
| 6 | "Professional Experience" section headline — same on homepage and About page, lacks distinction | Structure | Med | `app/page.tsx:51`, `app/about/page.tsx:207` |
| 7 | "Let's Build Something Amazing" — generic, overused closing CTA | Impact | Med | `app/about/page.tsx:298` |
| 8 | "Get In Touch" CTA — passive, not action-specific | Conversion | Med | `components/hero.tsx:186` |
| 9 | "Selected work in data engineering..." — passive, no reader benefit | Impact | Low | `app/projects/page.tsx:44` |
| 10 | "Let's Connect" — fine but paired CTA "Email Me Directly" redundant with contact form | Conversion | Low | `app/contact/page.tsx:74-82` |
| 11 | "Prefer a Quick Chat? ... Sometimes a conversation is worth a thousand emails" — wordy | Clarity | Low | `app/contact/page.tsx:72-78` |
| 12 | "engineering firmware" — slight awkwardness | Clarity | Low | `app/about/page.tsx:93` |
| 13 | "Now, I'm a Master's student" — weak transition | Clarity | Low | `app/about/page.tsx:103` |
| 14 | "My journey into data science began..." — opens with "journey," not reader's problem | Impact | Med | `app/about/page.tsx:92` |
| 15 | "I believe the future belongs to those who can bridge the gap between complex algorithms and practical applications" — wordy | Clarity | Low | `app/about/page.tsx:105` |
| 16 | "View Full Experience" / "Read Article" / "View Projects" — functional, not benefit-driven | Conversion | Med | `app/page.tsx:63,119`, `hero.tsx:183` |
| 17 | RSS feed title "Kanit Mann - Articles" — generic | Impact | Low | `app/rss.xml/route.ts` |
| 18 | "Share on X" — looks like a placeholder | Tone | Low | `components/social-share.tsx` |
| 19 | "Send Message" — no confirmation that email client will open | Conversion | Low | `components/contact-form.tsx:126` |
| 20 | "analytics" and "machine learning" — second is subfield of third in list | Clarity | Low | `app/projects/page.tsx:44` |
| 21 | Portfolio positions as Data Scientist; LinkedIn targets Data Analyst/Engineer — mismatch for recruiters | Clarity | **High** | Site-wide |
| 22 | No "Seeking Summer 2026" or job-search status anywhere | Conversion | **High** | Site-wide |
| 23 | "2 years of engineering experience" hidden in narrative, not stated upfront | Impact | Med | `app/about/page.tsx` |
| 24 | "Ex-Ericsson" never used as credibility signal | Impact | Med | Site-wide |
| 25 | Portfolio emphasizes ML models; LinkedIn emphasizes dashboards, ETL, BI tools — audience sees both | Clarity | Low | Projects list |
| 26 | **NetSTAR Global ML Engineer role (Jan-May 2026) missing entirely** | Impact | **High** | All pages |
| 27 | **"1 Billion Phishing URLs" — best specific number, not used anywhere** | Impact | **High** | Site-wide |
| 28 | UA Student Lead currently listed under Leadership but missing "70 students" scope | Clarity | Low | `app/about/page.tsx:244` |
| 29 | Decision Sciences & Student Council missing from Leadership section | Clarity | Low | `app/about/page.tsx` |

---

## What's Working

- Consistent typographic voice (serif for names, monospace for metadata)
- About page three-paragraph arc (firmware → cloud → MS Data Science) is concrete and effective
- Project descriptions are specific and tech-stack-rich
- Contact page info hierarchy (Email > Location > socials in priority order)
- Thorough SEO metadata (keywords, OG, Twitter, JSON-LD, robots)
- "also known as Ken" adds personality (minor phrasing aside)
- Certifications section — specific issuer names, credential IDs build trust
- Graduation narrative — personal and vulnerable, good human touch
- CTA placement — present but not overwhelming

---

## Rewrite Plan

### 1. Unify Positioning

Adopt a hybrid title that works for both Data Analyst and Data Scientist recruiting:

- **Hero:** "Data Analyst & ML Engineer"  
- **Metadata:** "Data Analyst & ML Engineer · Python, SQL, GCP, Tableau"  
- **Footer:** "Data Analyst & ML Engineer"  
- **RSS feed:** "Kanit Mann — Data & Engineering"

### 2. Add Job-Seeking Signal

- **Navigation:** Add `Seeking Summer 2026` badge or pill next to "KANIT" logo
- **Hero:** Add line below title: `Ex-Ericsson · NetSTAR · Seeking Summer 2026`
- **Homepage:** New "Currently Seeking" section between Hero and Experience

### 3. Add Missing Experience: NetSTAR Global

Add to `data/experiences.ts`:

```typescript
{
  id: "netstar",
  company: "NetSTAR Global, Inc.",
  position: "Machine Learning Engineer",
  type: "Apprenticeship",
  location: "Tucson, AZ",
  startDate: "Jan 2026",
  endDate: "May 2026",
  duration: "5 mos",
  workMode: "On-site",
  description:
    "Engineered an enterprise-grade automated threat intelligence platform with a hybrid detection architecture combining a FastText NLP classifier, structured ML models, and algorithmic distance rules to identify deceptive URLs and brand spoofing. Analyzed 1 billion phishing URLs using SQL and orchestrated a containerized environment for real-time telemetry on a live Power BI dashboard, integrating NetSTAR and PhishStats APIs for zero-day threat evaluation.",
  skills: [
    "FastText", "NLP", "Machine Learning", "Python",
    "SQL", "Power BI", "Docker", "Threat Intelligence",
  ],
  achievements: [
    "Improved phishing detection accuracy through hybrid ML + rules architecture",
    "Analyzed 1 billion phishing URLs to train detection models",
    "Reduced manual investigation time for client security teams",
    "Built real-time Power BI dashboard for threat telemetry",
  ],
  featuredOnHome: true,
}
```

### 4. Add Missing Leadership: Decision Sciences & Student Council

Add to "Leadership & Collaboration" on About page:

```
<h3>Decision Sciences and Student Council</h3>
<p>University of Arizona · Oct 2025 – May 2026 · Tucson, AZ</p>
<ul>
  <li>— Served on student council representing the Decision Sciences department</li>
  <li>— Advocated for student needs and facilitated communication between faculty and students</li>
</ul>
```

### 5. Update UA Student Lead Entry

Update existing entry to include scale:

```
"Lead a team of 70 students as primary register lead; design onboarding
playbooks, supervise floor operations, and train members on POS technology."
```

### 6. Hero Rewrite

```
<h1>KANIT MANN</h1>
<p>Ken</p>
<p>Data Analyst & ML Engineer</p>
<p>Ex-Ericsson · NetSTAR · Seeking Summer 2026</p>
<p>
  Analyzed 1B phishing URLs. Built threat intelligence pipelines.
  Automated dashboards that drive security decisions.
</p>
```

CTAs:
- "View Projects" → "See My Work"
- "Get In Touch" → "Start a Conversation"

### 7. Homepage — "Currently Seeking" Section

Add after Hero, before Experience:

```tsx
<section className="py-12 px-6 bg-primary/5">
  <div className="container mx-auto max-w-4xl text-center">
    <h2 className="text-2xl font-bold mb-2">Currently Seeking — Summer 2026</h2>
    <p className="text-muted-foreground mb-4">
      Data Analyst with ML engineering experience. Built threat intelligence
      platforms analyzing 1B+ URLs. 2 years at Ericsson. Proficient in SQL,
      Python, Tableau, Looker Studio, GCP, Power BI.
    </p>
    <Button asChild>
      <Link href="/contact">Hire me →</Link>
    </Button>
  </div>
</section>
```

### 8. About Page — Opening Rewrite

Replace the first paragraph with LinkedIn-style framing:

```
I'm a Data Analyst with 2 years of engineering experience designing
automated dashboards and ETL pipelines. I work in SQL, Python, and BI
tools — Tableau, Looker Studio — translating stakeholder requirements
into metrics that drive decisions. Delivered real-time threat intelligence
and employee transfer reporting at Ericsson. Seeking a full-time Data
Analyst role starting Summer 2026.
```

Then follow with the existing three-paragraph arc as background.

### 9. About Page — Closing CTA

```
"Let's Build Something Amazing"
→
"Let's build something that works"
```

### 10. Footer Tagline

```
"Building thoughtful solutions"
→
"Dashboards · Pipelines · Data Products"
```

### 11. Contact Page CTA

```
"Sometimes a conversation is worth a thousand emails. Feel free to reach out directly."
→
"Email works best. I usually respond within a few hours."
```

### 12. Contact Form Button

```
"Sending via email..." / "Send Message"
→
"Opening email..." / "Send via Email"
```

### 13. Projects Subtitle

```
"Selected work in data engineering, analytics, and machine learning"
→
"Data engineering, analytics, and ML — built end-to-end"
```

### 14. Title Consistency

- `layout.tsx`: `"Kanit Mann - Data Analyst & ML Engineer"`
- `hero.tsx`: `"Data Analyst" / "& ML Engineer"` (or `"Data Analyst & ML Engineer"`)
- `footer.tsx`: `"Data Analyst & ML Engineer"`

---

## Implementation Priority

| Priority | Change | Effort |
|----------|--------|--------|
| P0 | Fix GPA contradiction (about page says 4.0, GraduationSection gets 3.75) | 2 min |
| P0 | Add NetSTAR Global to `data/experiences.ts` | 5 min |
| P0 | Add "Seeking Summer 2026" to nav + hero | 10 min |
| P0 | Add "Currently Seeking" homepage section | 15 min |
| P1 | Rewrite About page opening with LinkedIn framing | 10 min |
| P1 | Add Decision Sciences & Student Council to Leadership | 5 min |
| P1 | Update UA Student Lead with "70 students" | 2 min |
| P1 | Unify title across hero/footer/metadata | 10 min |
| P2 | Sharpen CTAs | 10 min |
| P2 | Tweak footer tagline | 2 min |
| P2 | Tweak contact page CTA copy | 5 min |
| P3 | Fix minor clarity issues (list, transitions, RSS) | 10 min |
