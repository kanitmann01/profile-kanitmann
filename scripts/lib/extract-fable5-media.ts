// scripts/lib/extract-fable5-media.ts
// Low-level primitives for fetching and downloading Fable 5 media from X posts

export type MediaKind = "video" | "photo";

export type MediaEntry =
  | { kind: "video"; poster: string; videoUrl?: string }
  | { kind: "photo"; url: string };

export type DownloadResult =
  | { ok: true; path: string; contentType: string }
  | { ok: false; error: string };

/**
 * Fetches the syndication JSON for an X status ID.
 * Uses the no-auth syndication endpoint.
 * @param statusId - The numeric X status ID
 * @returns The parsed JSON response, or null on failure
 */
export async function fetchTweetMedia(
  statusId: string
): Promise<unknown | null> {
  try {
    const url = `https://cdn.syndication.twimg.com/tweet-result?id=${statusId}&token=a`;
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Picks the right media URL out of a syndication response.
 * - For videos: uses the auto-generated poster frame
 * - For photos: uses the first photo
 * @param tweet - The parsed syndication JSON
 * @returns A MediaEntry or null if no media
 */
export function pickMediaEntry(tweet: any): MediaEntry | null {
  if (!tweet || typeof tweet !== "object") {
    return null;
  }

  const mediaDetails = tweet.mediaDetails;
  if (!Array.isArray(mediaDetails) || mediaDetails.length === 0) {
    // Check for photos array (older format)
    const photos = tweet.photos;
    if (Array.isArray(photos) && photos.length > 0) {
      return {
        kind: "photo",
        url: photos[0].url,
      };
    }
    return null;
  }

  const firstMedia = mediaDetails[0];
  if (firstMedia.type === "video") {
    // Use video_info.poster if available, otherwise fall back to media_url_https
    const poster = firstMedia.video_info?.poster || firstMedia.media_url_https;
    if (poster) {
      return {
        kind: "video",
        poster: poster,
        videoUrl: firstMedia.video_info?.variants?.[0]?.url,
      };
    }
  }

  if (firstMedia.type === "photo" && firstMedia.media_url_https) {
    return {
      kind: "photo",
      url: firstMedia.media_url_https,
    };
  }

  return null;
}

/**
 * Downloads media from a URL to a destination path.
 * Picks the file extension from the Content-Type header.
 * @param url - The media URL to download
 * @param destPath - The destination file path
 * @returns A DownloadResult indicating success or failure
 */
export async function downloadMedia(
  url: string,
  destPath: string
): Promise<DownloadResult> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}` };
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const extension = getExtensionFromContentType(contentType);

    const buffer = await response.arrayBuffer();
    const fs = await import("fs/promises");
    await fs.writeFile(destPath, Buffer.from(buffer));

    return {
      ok: true,
      path: destPath,
      contentType,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Builds the X embed URL for a status ID.
 * @param statusId - The numeric X status ID
 * @returns The embed URL
 */
export function buildXEmbedUrl(statusId: string): string {
  return `https://platform.twitter.com/embed/Tweet.html?id=${statusId}`;
}

/**
 * Extracts the status ID from an X post URL.
 * @param url - The X post URL
 * @returns The status ID, or null if not an X URL
 */
export function extractTweetIdFromUrl(url: string): string | null {
  const match = url.match(/(?:x\.com|twitter\.com)\/[^/]+\/status\/(\d+)/);
  return match ? match[1] : null;
}

/**
 * Gets a file extension from a Content-Type header.
 * @param contentType - The Content-Type header value
 * @returns The file extension (including the dot)
 */
function getExtensionFromContentType(contentType: string): string {
  if (contentType.includes("jpeg") || contentType.includes("jpg")) {
    return ".jpg";
  }
  if (contentType.includes("png")) {
    return ".png";
  }
  if (contentType.includes("webp")) {
    return ".webp";
  }
  if (contentType.includes("gif")) {
    return ".gif";
  }
  return ".jpg";
}
