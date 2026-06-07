const formatters = {
  short: new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }),
  long: new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }),
}

export function formatDate(dateString: string, format: "short" | "long" = "short"): string | undefined {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return undefined
  return formatters[format].format(date)
}
