"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { SlideIn } from "@/components/animations/slide-in"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"

type DataPoint = {
  category: string
  survived: number
  died: number
  survivalRate?: number
}

type TitanicChartsProps = {
  genderData: DataPoint[]
  classData: DataPoint[]
  ageData: DataPoint[]
}

export function TitanicCharts({ genderData, classData, ageData }: TitanicChartsProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Demographics Trumped Decisions</h2>
      <p className="text-muted-foreground mb-8">
        The data reveals clear patterns in survival rates based on passenger demographics. Using machine learning
        analysis, we can see how gender, class, and age significantly influenced who survived the Titanic disaster.
      </p>

      {/* Gender Chart */}
      <SlideIn direction="left" className="mb-12">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Titanic Survival by Gender</h3>
        <div className="w-full max-w-full overflow-x-auto">
          <ScaleOnHover>
            <Card className="w-full max-w-full">
              <CardContent className="pt-6 w-full max-w-full">
                <ChartContainer
                  config={{
                    survived: { label: "Survived", color: "hsl(142, 76%, 36%)" },
                    died: { label: "Died", color: "hsl(0, 84%, 60%)" },
                  }}
                  className="h-[300px] sm:h-[350px] min-w-[320px] w-full max-w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={genderData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend wrapperStyle={{ paddingTop: 20 }} />
                      <Bar dataKey="survived" fill="var(--color-survived)" name="Survived" />
                      <Bar dataKey="died" fill="var(--color-died)" name="Died" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <p className="text-sm text-muted-foreground mt-2">
                  Women had a 74.2% survival rate compared to just 18.9% for men
                </p>
              </CardContent>
            </Card>
          </ScaleOnHover>
        </div>
      </SlideIn>

      {/* Class Chart */}
      <div className="mb-12">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Titanic Survival by Passenger Class</h3>
        <div className="w-full max-w-full overflow-x-auto">
          <Card className="w-full max-w-full">
            <CardContent className="pt-6 w-full max-w-full">
              <ChartContainer
                config={{
                  survived: { label: "Survived", color: "hsl(142, 76%, 36%)" },
                  died: { label: "Died", color: "hsl(0, 84%, 60%)" },
                }}
                className="h-[300px] sm:h-[350px] min-w-[320px] w-full max-w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ paddingTop: 20 }} />
                    <Bar dataKey="survived" fill="var(--color-survived)" name="Survived" />
                    <Bar dataKey="died" fill="var(--color-died)" name="Died" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="text-sm text-muted-foreground mt-2">
                First-class passengers had a 63% survival rate, while third-class had only 24.2%
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Age Chart */}
      <div className="mb-12">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Titanic Survival by Age Group</h3>
        <div className="w-full max-w-full overflow-x-auto">
          <Card className="w-full max-w-full">
            <CardContent className="pt-6 w-full max-w-full">
              <ChartContainer
                config={{
                  survived: { label: "Survived", color: "hsl(142, 76%, 36%)" },
                  died: { label: "Died", color: "hsl(0, 84%, 60%)" },
                }}
                className="h-[300px] sm:h-[350px] min-w-[320px] w-full max-w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ paddingTop: 20 }} />
                    <Bar dataKey="survived" fill="var(--color-survived)" name="Survived" />
                    <Bar dataKey="died" fill="var(--color-died)" name="Died" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="text-sm text-muted-foreground mt-2">
                Children had the highest survival rate at 42.2%, while elderly passengers had only 14.3%
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

