import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const LIKES_FILE = path.join(process.cwd(), "data", "likes.json")

type LikesData = Record<string, number>

async function readLikes(): Promise<LikesData> {
  try {
    const data = await fs.readFile(LIKES_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist or is empty, return empty object
    return {}
  }
}

async function writeLikes(data: LikesData): Promise<void> {
  await fs.writeFile(LIKES_FILE, JSON.stringify(data, null, 2), "utf-8")
}

// GET /api/likes - Get all like counts
export async function GET() {
  try {
    const likes = await readLikes()
    return NextResponse.json(likes)
  } catch (error) {
    console.error("Error reading likes:", error)
    return NextResponse.json({ error: "Failed to read likes" }, { status: 500 })
  }
}

// POST /api/likes - Increment like count for an item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { itemId } = body

    if (!itemId || typeof itemId !== "string") {
      return NextResponse.json({ error: "Invalid itemId" }, { status: 400 })
    }

    const likes = await readLikes()
    likes[itemId] = (likes[itemId] || 0) + 1
    await writeLikes(likes)

    return NextResponse.json({ itemId, count: likes[itemId] })
  } catch (error) {
    console.error("Error updating likes:", error)
    return NextResponse.json({ error: "Failed to update likes" }, { status: 500 })
  }
}

