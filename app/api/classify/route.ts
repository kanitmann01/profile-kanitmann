import { NextResponse } from "next/server";
import { classifyUrl, validateUrlInput } from "@/lib/netstar/classify";
import type { ClassifyError, ClassifyResponse } from "@/lib/netstar/types";

/**
 * NetSTAR live classification endpoint (Exp 13 flagship demo).
 *
 * URL text in -> category + confidence + latency. Runs the int16-quantized
 * FastText model retrained from the NetSTAR-labeled corpus entirely in the
 * serverless runtime — no external API calls, no Python, no iframe.
 * The full model is 947,658 bytes and ships as a static module import, so
 * inference is a single in-memory matrix multiply.
 */

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." } satisfies ClassifyError,
      {
        status: 400,
      }
    );
  }

  const url = (body as { url?: unknown } | null)?.url;
  const validationError = validateUrlInput(url);
  if (validationError) {
    return NextResponse.json(
      { error: validationError } satisfies ClassifyError,
      {
        status: 400,
      }
    );
  }

  try {
    const result: ClassifyResponse = classifyUrl((url as string).trim());
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message } satisfies ClassifyError, {
      status: 400,
    });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Use POST with a JSON body { "url": "..." }.',
    } satisfies ClassifyError,
    { status: 405 }
  );
}
