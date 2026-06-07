export function TwitchAnalyticsPipelineContent() {
  return (
    <>
      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Architecture</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="bg-muted/30 border border-border rounded-lg p-6 mb-8">
          <p className="text-sm font-mono text-center text-muted-foreground">
            Twitch API → Python Producer → Apache Kafka → Snowflake (Raw) → dbt (Transformation) → Looker Studio
          </p>
        </div>
        <p className="font-sans text-muted-foreground leading-relaxed">
          This pipeline demonstrates a modern data stack architecture capable of handling real-time data ingestion, cloud warehousing, and automated transformation. The system monitors live streams for Age of Empires II, processing events through Apache Kafka, loading them into Snowflake via a custom Python consumer, and transforming the raw JSON data using dbt for analytics.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Pipeline Stages</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">1. Ingestion (Producer)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Python script polls Twitch API every 60 seconds for live Age of Empires II streams. Extracts metadata (streamer_name, viewer_count, started_at, language), serializes to JSON, and pushes to Kafka topic.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">2. Storage (Consumer)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Python consumer listens to Kafka topic, batches messages for efficiency, and loads raw JSON directly into Snowflake VARIANT column (RAW_DATA) in the STREAM_LOGS table.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">3. Transformation (dbt)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              dbt models clean and normalize data. Parses JSON fields into structured columns, calculates stream duration, and filters out streams with 0 viewers to prevent visualization skew.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Key Features</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Real-Time Processing</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              60-second polling interval with Kafka buffering ensures near real-time data availability while handling API rate limits and network variability.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Schema-on-Read with VARIANT</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Raw JSON stored in Snowflake VARIANT column allows flexible schema evolution without pipeline changes. dbt handles transformation logic separately.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Automated Visualization</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Looker Studio dashboard automatically reflects transformed data, showing concurrent viewers, top streamers by popularity, and peak viewership metrics.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Technology Stack</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Source: Twitch API (Helix)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Official Twitch API providing real-time stream metadata for Age of Empires II category.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Streaming: Apache Kafka (Confluent Cloud)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Managed Kafka service handling message buffering, partitioning, and consumer group management with free tier support.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Warehouse: Snowflake (Standard Edition)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Cloud data warehouse with VARIANT column support for semi-structured data, automatic scaling, and separation of storage and compute.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Transformation: dbt (data build tool)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              SQL-based transformation framework with testing, documentation, and lineage tracking. Models parse JSON and calculate derived metrics.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Dashboard Metrics</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Concurrent Viewers</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Real-time viewer count across all tracked streams, updated every 60 seconds.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Top Streamers</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Ranked list of streamers by current viewership, showing audience distribution.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Peak Viewership</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Historical maximum viewer counts with timestamps for trend analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Future Enhancements</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Containerization & Orchestration</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Dockerize producer and consumer scripts, schedule dbt runs with Apache Airflow for production-grade orchestration.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Alerting System</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Slack notifications when viewership spikes (e.g., {">"} 10k viewers) for real-time monitoring.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">CI/CD Pipeline</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Automate dbt testing on GitHub merge, ensuring data quality and model reliability before deployment.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
