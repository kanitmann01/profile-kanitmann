export function VoiceBridgeContent() {
  return (
    <>
      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">The Challenge</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <p className="font-sans text-muted-foreground leading-relaxed">
          Language barriers remain one of humanity&rsquo;s oldest challenges, preventing effective communication in
          international business meetings, educational exchanges, tourist interactions, and family connections.
          The challenge was to create a solution that enables real-time conversation between people speaking
          different languages while maintaining privacy through on-device processing and ensuring minimal latency
          for natural conversation flow.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Technical Approach</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Web-Based Interface</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Built with HTML5, CSS3, and JavaScript to work on any device with a modern browser, providing
              cross-platform compatibility without requiring app installations.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">AI Pipeline Architecture</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Implemented a modular pipeline connecting Whisper (ASR), NLLB-200 (Translation), and MMS-TTS
              (Speech Synthesis) for end-to-end speech processing.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">P2P Communication</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Used Socket.IO for peer-to-peer architecture with direct communication and no server-side
              conversation processing for enhanced privacy.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Key Features</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Real-time Translation</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Seamless speech-to-speech translation with minimal latency, supporting 12+ languages including English,
              Spanish, French, Chinese, Hindi, and more for natural conversation flow.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">On-Device Processing</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Fully on-device processing using cutting-edge AI models (Whisper, NLLB-200, MMS-TTS) for enhanced
              privacy with no third-party service dependencies.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Peer-to-Peer Architecture</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Direct communication between users with no server-side conversation processing, ensuring complete
              privacy and reducing latency through optimized data flow.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Web-Based Interface</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Works on any device with a modern browser, featuring audio level visualization, connection quality
              indicators, and mobile-friendly design for universal accessibility.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Advanced User Experience</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Hold-to-speak functionality, text fallback for noisy environments, quick phrases for instant
              translation, and context maintenance for coherent conversations.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Results & Impact</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">12+ Languages Supported</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Including major world languages with near real-time latency optimized for natural conversation flow.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">100% Privacy</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              On-device processing with no third-party service dependencies.
            </p>
          </div>
          <div>
            <p className="font-sans text-muted-foreground leading-relaxed">
              VoiceBridge successfully tackles one of humanity&rsquo;s oldest challenges by breaking down language barriers
              in real-time. The project has been particularly impactful for international business meetings,
              educational exchanges, tourist interactions, and connecting families who speak different languages.
              The combination of cutting-edge AI models with privacy-focused on-device processing has created a
              seamless translation experience that feels natural and immediate.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Lessons Learned</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Privacy-First Design is Essential</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Users highly value privacy in communication tools. Implementing on-device processing with no
              third-party dependencies significantly increased user trust and adoption rates.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">AI Model Integration Complexity</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Integrating multiple AI models (Whisper, NLLB-200, MMS-TTS) required careful pipeline orchestration
              and optimization to maintain real-time performance while ensuring translation quality.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Web-Based Accessibility</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Building a web-based interface that works across all devices and browsers required extensive
              testing and optimization, but provided universal accessibility without app store dependencies.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
