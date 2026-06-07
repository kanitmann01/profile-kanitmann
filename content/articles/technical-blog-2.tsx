import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, Monitor, Users } from "lucide-react"
import { SlideIn } from "@/components/animations/slide-in"
import { getArticleBySlug } from "@/data/articles"

const CLI_MERITS = [
  "Gives detailed control to the user",
  "Faster for repetitive or automated tasks",
  "Low memory consumption",
  "Looks cooler (according to the power-user bias!)",
]

const CLI_DEMERITS = [
  "Steeper initial learning curve",
  "Low fault tolerance when commands are mistyped",
  "Syntax knowledge required to be productive",
]

const GUI_MERITS = [
  "Graphically intuitive with a gentle learning curve",
  "Guided, discoverable workflows",
  "Visually polished and easy to navigate",
]

const GUI_DEMERITS = [
  "Higher memory consumption",
  "Can feel slower for experienced users",
  "Limited automation without third-party tools",
]

const article = getArticleBySlug("technical-blog-2")

type MeritListProps = {
  title: string
  items: string[]
  variant?: "merit" | "demerit"
}

function MeritList({ title, items, variant = "merit" }: MeritListProps) {
  const isDemerit = variant === "demerit"
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">{title}</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className={isDemerit ? "text-red-600 dark:text-red-400" : undefined}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TechnicalBlog2Content() {
  return (
    <>
      <section className="mb-16">
        <SlideIn direction="left">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              My own journey began with a CS engineering background and professional time spent deep in the terminal. The initial CLI learning curve felt manageable because file navigation, scripts, and automation were part of the job. For people new to computing, terminals can appear unforgiving, but that first exposure often ignites curiosity-either you fall in love with the power or run back to graphical menus.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              After bouncing between both worlds, I now favor a hybrid mode: terminals for reproducibility and automation; graphical interfaces for discovery, visualization, and creative flow. The key is knowing why you are reaching for one or the other.
            </p>
          </div>
        </SlideIn>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Merits and Demerits</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Command className="h-5 w-5 text-primary" /> Command Line Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MeritList title="Merits" items={CLI_MERITS} />
              <MeritList title="Demerits" items={CLI_DEMERITS} variant="demerit" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Monitor className="h-5 w-5 text-primary" /> Graphical User Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MeritList title="Merits" items={GUI_MERITS} />
              <MeritList title="Demerits" items={GUI_DEMERITS} variant="demerit" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Rules of Thumb</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Automate repetitive tasks", "Prototype visually first", "Blend both in daily workflows"].map(
            (rule) => (
              <Card key={rule}>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed">{rule}</p>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Team Enablement</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" /> Leading balanced adoption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              On mixed-experience teams I introduce the CLI through scripts that solve real problems, paired with GUI walkthroughs that explain the same workflow. Documentation calls out the advantages of both so teammates build confidence rather than allegiance.
            </p>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t pt-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
