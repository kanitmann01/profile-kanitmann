# The Three-Line Skill That Changed Everything

The AI skill that changed everything for me is three lines long. It doesn't generate code, doesn't build features, doesn't touch your codebase. It just asks you questions, and won't let you start coding until you've actually thought through what you're building.

I'm talking about `/grill-me`, one of the AI skills (markdown files that instruct the AI agent, invoked with `/skill-name`) created by Matt Pocock.

Before I found it, my workflow looked like this: I'd think of a feature, throw a prompt at my agent, and watch it go. The agent was always eager to start editing files the second it got a command. I'd assume it understood my intent. It would assume things too, and those assumptions were often wrong. And the result was a slop machine: thousands, sometimes millions of tokens burned creating generic AI-generated trash I never wanted. (Apologies for being rude, AI overlord, but the code I have seen gave me brain cancer.)

The skill does one thing, and it does it (chef's kiss) amazingly. It interviews you about your feature before you touch a single line of code. It asks questions you haven't thought of. Questions about edge cases, about consistency with your existing system, about how things should work on mobile vs. desktop. It won't let you move forward until you've actually thought through what you're building. And that's the point, it forces you to stop yourself in your tracks.

After the grilling session, something shifted. The agent wasn't guessing anymore. It understood my intent the way I had it in my head. We were on the same page, complementing each other. I wasn't fighting the AI, I was working with it. And when we reached shared understanding, I'd move to the next skill: `/to-prd`, which converts all those thoughts into a PRD document.

Then `/to-issues` breaks that PRD into actionable steps, tagging each as AFK (AI can do it alone) or HITL (human in the loop). Finally, `/tdd` implements each issue with red-green tests. Four skills, each handling a phase the others can't touch.

The result? Clean, error-free code. The agent followed the AFK/HITL tags properly, needing almost no babysitting throughout the dev session. I wasn't babysitting anymore, I was directing. And when I did need to intervene, it was because of a small slip-up, and not because the whole approach was wrong.

Let me give you an example. I was adding a picture to my hero section. The skill asked: "How should this be handled in mobile view?" I would have just scaled it down or put it below the text. But the skill suggested hiding it entirely, as the image was covering negative space on desktop, but it didn't add relevance on mobile. I never would have thought to ask myself that question.

Before I close, I would like to address that some people think AI skills are just fancy prompts, and I would have agreed with them last week. I saw AI skills as huge markdown files eating up tokens. But these three lines in `/grill-me` changed how I think about working with agents. They brought me back to the driver's seat, thinking deeply about features, creating detailed PRDs, letting AI handle the implementation while I handle the direction. Knowing how to code still matters. It always will. But now I'm not fighting my tools. I'm working with them.
