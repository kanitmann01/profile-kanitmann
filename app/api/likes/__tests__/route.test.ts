import { describe, it, expect, vi, beforeEach } from "vitest"
import { NextRequest } from "next/server"

const { mockReadFile, mockWriteFile } = vi.hoisted(() => ({
  mockReadFile: vi.fn(),
  mockWriteFile: vi.fn(),
}))

vi.mock("fs/promises", () => ({
  default: {
    readFile: mockReadFile,
    writeFile: mockWriteFile,
  },
}))

import { GET, POST } from "../route"

describe("GET /api/likes", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns like counts from file", async () => {
    mockReadFile.mockResolvedValue(JSON.stringify({ "project-1": 5, "project-2": 3 }))

    const response = await GET()
    const body = await response.json()

    expect(body).toEqual({ "project-1": 5, "project-2": 3 })
  })

  it("returns empty object when file does not exist", async () => {
    mockReadFile.mockRejectedValue(new Error("ENOENT"))

    const response = await GET()
    const body = await response.json()

    expect(body).toEqual({})
  })
})

describe("POST /api/likes", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("increments count with like action", async () => {
    mockReadFile.mockResolvedValue(JSON.stringify({ "project-1": 5 }))

    const request = new NextRequest("http://localhost/api/likes", {
      method: "POST",
      body: JSON.stringify({ itemId: "project-1", action: "like" }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(body).toEqual({ itemId: "project-1", count: 6 })
    expect(mockWriteFile).toHaveBeenCalled()
  })

  it("decrements count with unlike action", async () => {
    mockReadFile.mockResolvedValue(JSON.stringify({ "project-1": 5 }))

    const request = new NextRequest("http://localhost/api/likes", {
      method: "POST",
      body: JSON.stringify({ itemId: "project-1", action: "unlike" }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(body).toEqual({ itemId: "project-1", count: 4 })
  })

  it("does not go below 0 on unlike", async () => {
    mockReadFile.mockResolvedValue(JSON.stringify({ "project-1": 0 }))

    const request = new NextRequest("http://localhost/api/likes", {
      method: "POST",
      body: JSON.stringify({ itemId: "project-1", action: "unlike" }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(body).toEqual({ itemId: "project-1", count: 0 })
  })

  it("defaults to like when action is omitted", async () => {
    mockReadFile.mockResolvedValue(JSON.stringify({ "project-1": 2 }))

    const request = new NextRequest("http://localhost/api/likes", {
      method: "POST",
      body: JSON.stringify({ itemId: "project-1" }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(body).toEqual({ itemId: "project-1", count: 3 })
  })

  it("returns 400 for invalid itemId", async () => {
    const request = new NextRequest("http://localhost/api/likes", {
      method: "POST",
      body: JSON.stringify({ itemId: "", action: "like" }),
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toBe("Invalid itemId")
  })

  it("returns 400 for missing itemId", async () => {
    const request = new NextRequest("http://localhost/api/likes", {
      method: "POST",
      body: JSON.stringify({ action: "like" }),
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })

  it("returns 400 for invalid action", async () => {
    const request = new NextRequest("http://localhost/api/likes", {
      method: "POST",
      body: JSON.stringify({ itemId: "project-1", action: "toggle" }),
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toBe("Invalid action")
  })

  it("creates new entry for unknown itemId", async () => {
    mockReadFile.mockResolvedValue(JSON.stringify({}))

    const request = new NextRequest("http://localhost/api/likes", {
      method: "POST",
      body: JSON.stringify({ itemId: "new-item", action: "like" }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(body).toEqual({ itemId: "new-item", count: 1 })
  })
})
