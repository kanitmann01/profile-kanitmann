import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { TagFilter } from "../tag-filter"

const mockTags = ["Python", "Apache Kafka", "Snowflake", "dbt", "React", "TypeScript", "Docker", "Flask", "Pandas", "Next.js"]
const mockTopTags = ["Python", "Apache Kafka", "Snowflake", "dbt", "React", "TypeScript", "Docker", "Flask"]
const mockRemainingTags = ["Pandas", "Next.js"]

describe("TagFilter", () => {
  it("renders tag chips for top tags", () => {
    render(
      <TagFilter
        allTags={mockTags}
        topTags={mockTopTags}
        selectedTags={[]}
        onTagsChange={vi.fn()}
      />
    )

    mockTopTags.forEach((tag) => {
      expect(screen.getByRole("button", { name: tag })).toBeInTheDocument()
    })
  })

  it("does not render remaining tags by default", () => {
    render(
      <TagFilter
        allTags={mockTags}
        topTags={mockTopTags}
        selectedTags={[]}
        onTagsChange={vi.fn()}
      />
    )

    mockRemainingTags.forEach((tag) => {
      expect(screen.queryByRole("button", { name: tag })).not.toBeInTheDocument()
    })
  })

  it("shows 'Show more' button when there are remaining tags", () => {
    render(
      <TagFilter
        allTags={mockTags}
        topTags={mockTopTags}
        selectedTags={[]}
        onTagsChange={vi.fn()}
      />
    )

    expect(screen.getByRole("button", { name: /show more/i })).toBeInTheDocument()
  })

  it("does not show 'Show more' button when all tags are in top tags", () => {
    render(
      <TagFilter
        allTags={mockTopTags}
        topTags={mockTopTags}
        selectedTags={[]}
        onTagsChange={vi.fn()}
      />
    )

    expect(screen.queryByRole("button", { name: /show more/i })).not.toBeInTheDocument()
  })

  it("shows all tags when 'Show more' is clicked", () => {
    render(
      <TagFilter
        allTags={mockTags}
        topTags={mockTopTags}
        selectedTags={[]}
        onTagsChange={vi.fn()}
      />
    )

    const showMoreButton = screen.getByRole("button", { name: /show more/i })
    fireEvent.click(showMoreButton)

    mockRemainingTags.forEach((tag) => {
      expect(screen.getByRole("button", { name: tag })).toBeInTheDocument()
    })
  })

  it("changes button text to 'Show less' when expanded", () => {
    render(
      <TagFilter
        allTags={mockTags}
        topTags={mockTopTags}
        selectedTags={[]}
        onTagsChange={vi.fn()}
      />
    )

    const showMoreButton = screen.getByRole("button", { name: /show more/i })
    fireEvent.click(showMoreButton)

    expect(screen.getByRole("button", { name: /show less/i })).toBeInTheDocument()
  })

  it("calls onTagsChange when a tag is clicked", () => {
    const onTagsChange = vi.fn()
    render(
      <TagFilter
        allTags={mockTags}
        topTags={mockTopTags}
        selectedTags={[]}
        onTagsChange={onTagsChange}
      />
    )

    const pythonButton = screen.getByRole("button", { name: "Python" })
    fireEvent.click(pythonButton)

    expect(onTagsChange).toHaveBeenCalledWith(["Python"])
  })

  it("removes tag from selection when clicked again", () => {
    const onTagsChange = vi.fn()
    render(
      <TagFilter
        allTags={mockTags}
        topTags={mockTopTags}
        selectedTags={["Python"]}
        onTagsChange={onTagsChange}
      />
    )

    const pythonButton = screen.getByRole("button", { name: "Python" })
    fireEvent.click(pythonButton)

    expect(onTagsChange).toHaveBeenCalledWith([])
  })

  it("visually indicates selected tags", () => {
    render(
      <TagFilter
        allTags={mockTags}
        topTags={mockTopTags}
        selectedTags={["Python"]}
        onTagsChange={vi.fn()}
      />
    )

    const pythonButton = screen.getByRole("button", { name: "Python" })
    expect(pythonButton).toHaveAttribute("aria-pressed", "true")
  })

  it("visually indicates unselected tags", () => {
    render(
      <TagFilter
        allTags={mockTags}
        topTags={mockTopTags}
        selectedTags={[]}
        onTagsChange={vi.fn()}
      />
    )

    const pythonButton = screen.getByRole("button", { name: "Python" })
    expect(pythonButton).toHaveAttribute("aria-pressed", "false")
  })

  it("handles multiple selected tags", () => {
    const onTagsChange = vi.fn()
    render(
      <TagFilter
        allTags={mockTags}
        topTags={mockTopTags}
        selectedTags={["Python", "React"]}
        onTagsChange={onTagsChange}
      />
    )

    const kafkaButton = screen.getByRole("button", { name: "Apache Kafka" })
    fireEvent.click(kafkaButton)

    expect(onTagsChange).toHaveBeenCalledWith(["Python", "React", "Apache Kafka"])
  })
})
