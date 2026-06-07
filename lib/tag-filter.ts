import { type Project } from "@/data/projects"

export function filterProjectsByTags(
  projects: Project[],
  selectedTags: string[]
): Project[] {
  if (selectedTags.length === 0) {
    return projects
  }

  return projects.filter((project) =>
    selectedTags.every((tag) => project.tags.includes(tag))
  )
}

export function tagsToQueryString(tags: string[]): string {
  if (tags.length === 0) {
    return ""
  }

  const normalizedTags = tags.map((tag) =>
    tag.toLowerCase().replace(/\s+/g, "-")
  )
  return `?tags=${normalizedTags.join(",")}`
}

export function queryStringToTags(query: string): string[] {
  if (!query) {
    return []
  }

  const params = new URLSearchParams(query)
  const tagsParam = params.get("tags")

  if (!tagsParam) {
    return []
  }

  return tagsParam.split(",").filter((tag) => tag.length > 0)
}

export function getTopTagsByFrequency(
  projects: Project[],
  limit: number
): string[] {
  const tagCounts = new Map<string, number>()

  projects.forEach((project) => {
    project.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  const sortedTags = Array.from(tagCounts.entries()).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1]
    }
    return a[0].localeCompare(b[0])
  })

  return sortedTags.map(([tag]) => tag).slice(0, limit)
}
