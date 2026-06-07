export function TitanicContent() {
  return (
    <>
      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">The Challenge</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <p className="font-sans text-muted-foreground leading-relaxed">
          The Titanic disaster remains one of history&rsquo;s most studied maritime tragedies, revealing fascinating
          patterns about social inequality and survival. The challenge was to create an engaging web application
          that not only predicts survival chances using machine learning but also educates users about the
          historical context and social patterns that emerged from this tragic event.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Technical Approach</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Data Processing</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Cleaned and preprocessed the Titanic dataset, handling missing values and feature engineering for
              optimal model performance using Pandas and NumPy.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Model Training</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Implemented Random Forest Classifier with optimized hyperparameters, achieving a Kaggle score of
              0.77751 with 100 trees and max depth of 5.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-3">Web Interface</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Built an interactive Flask application with Bootstrap UI, Chart.js visualizations, and real-time
              predictions with probability scores.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Key Features</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Interactive Form</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Easy-to-use form to input passenger details including class, gender, age, fare, family size, and
              port of embarkation for personalized survival predictions.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Real-time Predictions</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Get instant survival predictions with probability scores and detailed breakdowns showing how different
              factors influenced the outcome.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Beautiful UI</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Modern, responsive design with Bootstrap and custom CSS featuring gradient backgrounds, animations,
              and mobile-friendly interface.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Historical Context</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Learn about survival patterns from the actual Titanic data with interactive charts showing survival
              rates by demographics and social factors.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Probability Visualization</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Interactive Chart.js visualizations showing survival chances and feature importance, making complex
              data accessible and engaging.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Results & Impact</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">0.77751 Kaggle Score</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Kaggle competition score using Random Forest Classification with 100 trees and max depth of 5.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Live Deployment</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Successfully deployed on Railway with full functionality.
            </p>
          </div>
          <div>
            <p className="font-sans text-muted-foreground leading-relaxed">
              The application successfully combines machine learning with historical education, achieving a solid
              Kaggle score while making complex data science concepts accessible to the general public. The project
              reveals fascinating patterns from the Titanic disaster, including the &ldquo;women and children first&rdquo;
              policy (74% of women survived vs 19% of men) and class disparities (1st class: 63%, 2nd class: 47%,
              3rd class: 24% survival rates).
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-serif text-3xl text-foreground mb-2">Lessons Learned</h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Educational Value of Historical Data</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Combining machine learning with historical context creates powerful educational tools. The Titanic
              data reveals important social patterns that make the technical aspects more engaging and meaningful.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Model Interpretability Matters</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Random Forest&rsquo;s interpretability was crucial for this educational application. Users could understand
              how different factors influenced survival, making the AI more transparent and trustworthy.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground mb-2">Web Development Meets Data Science</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Flask provided the perfect framework for combining machine learning with web development. The
              combination of backend processing and frontend visualization created an engaging user experience.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
