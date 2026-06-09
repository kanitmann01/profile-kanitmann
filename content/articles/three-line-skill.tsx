"use client"

import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SlideIn } from "@/components/animations/slide-in"
import { getArticleBySlug } from "@/data/articles"

const article = getArticleBySlug("three-line-skill")

export function ThreeLineSkillContent() {
  return (
    <>
      <section className="mb-16">
        <SlideIn direction="left">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              The AI skill that changed everything for me is three lines long. It doesn't generate code, doesn't build features, doesn't touch your codebase. It just asks you questions, and won't let you start coding until you've actually thought through what you're building.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              I'm talking about <code>/grill-me</code>, one of the{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="underline decoration-dotted underline-offset-4 cursor-help">AI skills</TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Markdown files that instruct the AI agent, invoked with /skill-name</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{" "}
              created by Matt Pocock.
            </p>
          </div>
        </SlideIn>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Before the Skill</h2>
        <SlideIn >
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Before I found it, my workflow looked like this: I'd think of a feature, throw a prompt at my agent, and watch it go. The agent was always eager to start editing files the second it got a command. I'd assume it understood my intent. It would assume things too, and those assumptions were often wrong. And the result was a slop machine: thousands, sometimes millions of tokens burned creating generic AI-generated trash I never wanted. (Apologies for being rude, AI overlord, but the code I have seen gave me brain cancer.)
            </p>
          </div>
        </SlideIn>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">What It Does</h2>
        <SlideIn >
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              The skill does one thing, and it does it (chef's kiss) amazingly. It interviews you about your feature before you touch a single line of code. It asks questions you haven't thought of. Questions about edge cases, about consistency with your existing system, about how things should work on mobile vs. desktop. It won't let you move forward until you've actually thought through what you're building. And that's the point, it forces you to stop yourself in your tracks.
            </p>
          </div>
        </SlideIn>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">The Pipeline</h2>
        <SlideIn >
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              After the grilling session, something shifted. The agent wasn't guessing anymore. It understood my intent the way I had it in my head. We were on the same page, complementing each other. I wasn't fighting the AI, I was working with it. And when we reached shared understanding, I'd move to the next skill: <code>/to-prd</code>, which converts all those thoughts into a PRD document.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Then <code>/to-issues</code> breaks that PRD into actionable steps, tagging each as AFK (AI can do it alone) or HITL (human in the loop). Finally, <code>/tdd</code> implements each issue with red-green tests. Four skills, each handling a phase the others can't touch.
            </p>
          </div>
        </SlideIn>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">The Result</h2>
        <SlideIn >
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              The result? Clean, error-free code. The agent followed the AFK/HITL tags properly, needing almost no babysitting throughout the dev session. I wasn't babysitting anymore, I was directing. And when I did need to intervene, it was because of a small slip-up, and not because the whole approach was wrong.
            </p>
          </div>
        </SlideIn>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">A Concrete Example</h2>
        <SlideIn >
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Let me give you an example. I was adding a picture to my hero section. The skill asked: "How should this be handled in mobile view?" I would have just scaled it down or put it below the text. But the skill suggested hiding it entirely, as the image was covering negative space on desktop, but it didn't add relevance on mobile. I never would have thought to ask myself that question.
            </p>
          </div>
        </SlideIn>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Final Thoughts</h2>
        <SlideIn >
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Before I close, I would like to address that some people think AI skills are just fancy prompts, and I would have agreed with them last week. I saw AI skills as huge markdown files eating up tokens. But these three lines in <code>/grill-me</code> changed how I think about working with agents. They brought me back to the driver's seat, thinking deeply about features, creating detailed PRDs, letting AI handle the implementation while I handle the direction. Knowing how to code still matters. It always will. But now I'm not fighting my tools. I'm working with them.
            </p>
          </div>
        </SlideIn>
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
