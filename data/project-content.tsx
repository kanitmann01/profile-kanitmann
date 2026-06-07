import type { ComponentType } from "react"
import { TitanicContent } from "@/content/projects/titanic"
import { VoiceBridgeContent } from "@/content/projects/voicebridge"
import { EchoEffectContent } from "@/content/projects/echo-effect"
import { CollegeMajorShiftAnalysisContent } from "@/content/projects/college-major-shift-analysis"
import { UnifiedBharatContent } from "@/content/projects/unified-bharat"
import { TwitchAnalyticsPipelineContent } from "@/content/projects/twitch-analytics-pipeline"

export const projectContent: Record<string, ComponentType> = {
  titanic: TitanicContent,
  voicebridge: VoiceBridgeContent,
  "echo-effect": EchoEffectContent,
  "college-major-shift-analysis": CollegeMajorShiftAnalysisContent,
  "unified-bharat": UnifiedBharatContent,
  "twitch-analytics-pipeline": TwitchAnalyticsPipelineContent,
}
