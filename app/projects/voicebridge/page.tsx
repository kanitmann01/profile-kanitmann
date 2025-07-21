import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, Mic, Globe, Smartphone } from "lucide-react"
import Image from "next/image"

export default function VoicebridgeCaseStudy() {
  const techStack = ["Python", "Flask", "PyTorch", "Socket.IO", "Whisper", "NLLB-200", "MMS-TTS", "HTML5/CSS3/JavaScript"]

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">VoiceBridge - Real-Time P2P Translation</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Break language barriers with real-time speech translation using cutting-edge AI models for speech recognition,
            translation, and speech synthesis - all processed on-device for enhanced privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/kanitmann01/hackaz_team_wildhackers" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub Repo
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-16">
          <Image
            src="/images/case-studies/voicebridge.jpeg"
            alt="Voicebridge Mobile App Interface"
            width={800}
            height={400}
            className="w-full rounded-lg shadow-lg mb-8"
          />
        </div>

        {/* Problem Statement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">The Challenge</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Language barriers remain one of humanity's oldest challenges, preventing effective communication in
              international business meetings, educational exchanges, tourist interactions, and family connections.
              The challenge was to create a solution that enables real-time conversation between people speaking
              different languages while maintaining privacy through on-device processing and ensuring minimal latency
              for natural conversation flow.
            </p>
          </div>
        </section>

        {/* Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Technical Approach</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Smartphone className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Web-Based Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built with HTML5, CSS3, and JavaScript to work on any device with a modern browser, providing
                  cross-platform compatibility without requiring app installations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Mic className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI Pipeline Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Implemented a modular pipeline connecting Whisper (ASR), NLLB-200 (Translation), and MMS-TTS
                  (Speech Synthesis) for end-to-end speech processing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-2" />
                <CardTitle>P2P Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Used Socket.IO for peer-to-peer architecture with direct communication and no server-side
                  conversation processing for enhanced privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Real-time Translation</h3>
              <p className="text-muted-foreground">
                Seamless speech-to-speech translation with minimal latency, supporting 12+ languages including English,
                Spanish, French, Chinese, Hindi, and more for natural conversation flow.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">On-Device Processing</h3>
              <p className="text-muted-foreground">
                Fully on-device processing using cutting-edge AI models (Whisper, NLLB-200, MMS-TTS) for enhanced
                privacy with no third-party service dependencies.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Peer-to-Peer Architecture</h3>
              <p className="text-muted-foreground">
                Direct communication between users with no server-side conversation processing, ensuring complete
                privacy and reducing latency through optimized data flow.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Web-Based Interface</h3>
              <p className="text-muted-foreground">
                Works on any device with a modern browser, featuring audio level visualization, connection quality
                indicators, and mobile-friendly design for universal accessibility.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Advanced User Experience</h3>
              <p className="text-muted-foreground">
                Hold-to-speak functionality, text fallback for noisy environments, quick phrases for instant
                translation, and context maintenance for coherent conversations.
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Results & Impact</h2>
          <div className="bg-muted/30 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">12+</h3>
                <p className="text-muted-foreground">Languages supported including major world languages</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Near Real-time</h3>
                <p className="text-muted-foreground">Minimal latency optimized for natural conversation flow</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">100% Privacy</h3>
                <p className="text-muted-foreground">On-device processing with no third-party service dependencies</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-muted-foreground leading-relaxed">
                VoiceBridge successfully tackles one of humanity's oldest challenges by breaking down language barriers
                in real-time. The project has been particularly impactful for international business meetings,
                educational exchanges, tourist interactions, and connecting families who speak different languages.
                The combination of cutting-edge AI models with privacy-focused on-device processing has created a
                seamless translation experience that feels natural and immediate.
              </p>
            </div>
          </div>
        </section>

        {/* Lessons Learned */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Lessons Learned</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Privacy-First Design is Essential</h3>
              <p className="text-blue-800">
                Users highly value privacy in communication tools. Implementing on-device processing with no
                third-party dependencies significantly increased user trust and adoption rates.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-2">AI Model Integration Complexity</h3>
              <p className="text-green-800">
                Integrating multiple AI models (Whisper, NLLB-200, MMS-TTS) required careful pipeline orchestration
                and optimization to maintain real-time performance while ensuring translation quality.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-2">Web-Based Accessibility</h3>
              <p className="text-purple-800">
                Building a web-based interface that works across all devices and browsers required extensive
                testing and optimization, but provided universal accessibility without app store dependencies.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 