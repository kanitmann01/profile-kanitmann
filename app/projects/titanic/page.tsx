import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github, BarChart3, Brain, Database } from "lucide-react"
import Image from "next/image"
import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"

export default function TitanicCaseStudy() {
  const techStack = ["Python", "Flask", "Scikit-learn", "Pandas", "Bootstrap", "Chart.js", "NumPy"]

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      {/* Breadcrumb JSON-LD */}
      <Script id="ld-breadcrumb-titanic" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kanit.codes/"},
            {"@type": "ListItem", "position": 2, "name": "Projects", "item": "https://kanit.codes/projects"},
            {"@type": "ListItem", "position": 3, "name": "Titanic Survival Predictor", "item": "https://kanit.codes/projects/titanic"}
          ]
        })}
      </Script>
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">Titanic Survival Predictor Web App</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A fun and interactive web application that predicts whether you would have survived the Titanic disaster
            based on your passenger profile. Built with Flask and machine learning using an optimized Random Forest model.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" asChild>
              <a href="https://titanic-survival-predictor.herokuapp.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/kanitmann01/titanic_survivor_web_app" target="_blank" rel="noopener noreferrer">
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
            src="/images/case-studies/titanic.jpeg"
            alt="Titanic Survival Predictor Dashboard"
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
              The Titanic disaster remains one of history's most studied maritime tragedies, revealing fascinating
              patterns about social inequality and survival. The challenge was to create an engaging web application
              that not only predicts survival chances using machine learning but also educates users about the
              historical context and social patterns that emerged from this tragic event.
            </p>
          </div>
        </section>

        {/* Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Technical Approach</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Database className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Data Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cleaned and preprocessed the Titanic dataset, handling missing values and feature engineering for
                  optimal model performance using Pandas and NumPy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Model Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Implemented Random Forest Classifier with optimized hyperparameters, achieving a Kaggle score of
                  0.77751 with 100 trees and max depth of 5.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Web Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built an interactive Flask application with Bootstrap UI, Chart.js visualizations, and real-time
                  predictions with probability scores.
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
              <h3 className="text-xl font-semibold mb-2">Interactive Form</h3>
              <p className="text-muted-foreground">
                Easy-to-use form to input passenger details including class, gender, age, fare, family size, and
                port of embarkation for personalized survival predictions.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Real-time Predictions</h3>
              <p className="text-muted-foreground">
                Get instant survival predictions with probability scores and detailed breakdowns showing how different
                factors influenced the outcome.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Beautiful UI</h3>
              <p className="text-muted-foreground">
                Modern, responsive design with Bootstrap and custom CSS featuring gradient backgrounds, animations,
                and mobile-friendly interface.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Historical Context</h3>
              <p className="text-muted-foreground">
                Learn about survival patterns from the actual Titanic data with interactive charts showing survival
                rates by demographics and social factors.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Probability Visualization</h3>
              <p className="text-muted-foreground">
                Interactive Chart.js visualizations showing survival chances and feature importance, making complex
                data accessible and engaging.
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
                <h3 className="text-2xl font-bold text-primary mb-4">0.77751</h3>
                <p className="text-muted-foreground">Kaggle competition score using Random Forest Classification</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">100 Trees</h3>
                <p className="text-muted-foreground">Optimized Random Forest model with max depth of 5</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Live Demo</h3>
                <p className="text-muted-foreground">Successfully deployed on Railway with full functionality</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-muted-foreground leading-relaxed">
                The application successfully combines machine learning with historical education, achieving a solid
                Kaggle score while making complex data science concepts accessible to the general public. The project
                reveals fascinating patterns from the Titanic disaster, including the "women and children first"
                policy (74% of women survived vs 19% of men) and class disparities (1st class: 63%, 2nd class: 47%,
                3rd class: 24% survival rates).
              </p>
            </div>
          </div>
        </section>

        {/* Lessons Learned */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Lessons Learned</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Educational Value of Historical Data</h3>
              <p className="text-blue-800">
                Combining machine learning with historical context creates powerful educational tools. The Titanic
                data reveals important social patterns that make the technical aspects more engaging and meaningful.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-2">Model Interpretability Matters</h3>
              <p className="text-green-800">
                Random Forest's interpretability was crucial for this educational application. Users could understand
                how different factors influenced survival, making the AI more transparent and trustworthy.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-2">Web Development Meets Data Science</h3>
              <p className="text-purple-800">
                Flask provided the perfect framework for combining machine learning with web development. The
                combination of backend processing and frontend visualization created an engaging user experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Titanic Survival Predictor Web App - Project | Kanit Mann",
  description: "Interactive Flask app predicting Titanic survival with an optimized Random Forest model and educational visualizations.",
  alternates: { canonical: "/projects/titanic" },
  openGraph: {
    title: "Titanic Survival Predictor Web App - Project | Kanit Mann",
    description: "Interactive Flask app predicting Titanic survival with an optimized Random Forest model and educational visualizations.",
    url: "https://kanit.codes/projects/titanic",
    images: [
      { url: "https://kanit.codes/images/case-studies/titanic.jpeg" }
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Titanic Survival Predictor Web App - Project | Kanit Mann",
    description: "Interactive Flask app predicting Titanic survival with an optimized Random Forest model and educational visualizations.",
    images: ["https://kanit.codes/images/case-studies/titanic.jpeg"],
  },
}
