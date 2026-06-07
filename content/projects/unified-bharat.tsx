export function UnifiedBharatContent() {
  return (
    <>
      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Architecture</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Bronze Layer</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Raw data ingestion from 5 government sources: CSR spending, groundwater quality, educational institutions, LGD master codes, and population estimates. 245K+ rows preserved in original format.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Silver Layer</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Data cleaning, standardization, and aggregation. State-year level consolidation with quality filtering, reducing to ~1,500 rows across 4 tables.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Gold Layer</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Unified panel dataset with ~300 rows combining CSR, groundwater, and institutional metrics. Includes derived features like lagged CSR and per-capita normalizations.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Data Sources</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">CSR Spending (28,834 rows)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Ministry of Corporate Affairs data on Corporate Social Responsibility expenditure at district-year granularity. Tracks INR Crores and development sectors.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Groundwater Quality (188,209 rows)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Ministry of Jal Shakti station-level measurements including chemical parameters: Hardness, pH, Nitrate, Fluoride. Used to calculate contamination index (0-4 scale).
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Educational Institutions (2,141 rows)</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Ministry of Education data on approved intake and institution counts by state and institution type, tracking educational capacity over time.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Key Results</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Data Reduction: 99.88%</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              From 245K+ raw rows to ~300 unified panel rows through intentional aggregation and quality filtering, creating a clean dataset for rigorous analysis.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Random Forest Outperforms OLS</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Panel regression comparing OLS, Random Forest, and XGBoost models. Random Forest achieved best generalization (RMSE 0.811 on 5-fold CV), suggesting non-linear relationships between CSR and environmental outcomes.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Feature Importance Insights</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Number of monitoring stations (51%) and lagged CSR spending (21%) emerged as top predictors of contamination index, with institutional capacity contributing 18.8%.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Research Question</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <p className="font-sans text-lg text-foreground italic mb-4">
          &ldquo;Does subsequent improvement in groundwater quality associate with state-level CSR spending?&rdquo;
        </p>
        <p className="font-sans text-muted-foreground leading-relaxed">
          Using two-way fixed effects regression with state and year fixed effects to control for time-invariant state characteristics and common temporal trends.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Technical Implementation</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Distributed Processing with Apache Spark</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              PySpark for distributed data transformation across Bronze → Silver → Gold layers, handling 245K+ rows efficiently with partitioned operations.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Lakehouse with Apache Iceberg</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              ACID transactions, schema evolution, and time travel capabilities on MinIO S3 storage. Enables reproducible analytics and audit trails.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Docker Compose Infrastructure</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Local development environment with MinIO (S3-compatible storage) and Spark + Jupyter for interactive development and visualization.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Future Enhancements</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Additional Data Sources</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Integrate health outcomes, infrastructure development, and economic indicators to build a more comprehensive policy impact model.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Causal Inference Methods</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Apply difference-in-differences and instrumental variables approaches to strengthen causal claims beyond correlation.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
