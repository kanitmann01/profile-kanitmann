import type { ComponentType } from "react"
import { DataVizAnalysisContent } from "@/content/articles/data-viz-analysis"
import { TechnicalBlog2Content } from "@/content/articles/technical-blog-2"
import { TechnicalBlog3Content } from "@/content/articles/technical-blog-3"
import { CCRBAllegationsAnalysisContent } from "@/content/articles/ccrb-allegations-analysis"
import { BiosIssuesUbuntuContent } from "@/content/articles/bios-issues-ubuntu"

export const articleContent: Record<string, ComponentType> = {
  "data-viz-analysis": DataVizAnalysisContent,
  "technical-blog-2": TechnicalBlog2Content,
  "technical-blog-3": TechnicalBlog3Content,
  "ccrb-allegations-analysis": CCRBAllegationsAnalysisContent,
  "bios-issues-ubuntu": BiosIssuesUbuntuContent,
}
