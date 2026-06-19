# Fable 5 Media Extraction - Implementation Complete

## Overview

This implementation extracts real media (video posters and photos) from X posts for all 15 Fable 5 sites in the museum, and updates the `demoUrl` to use X embed URLs so the museum can properly display and embed the content.

## What Was Implemented

### Slice 1: X-Embed Modal Update ✅

- **File**: `components/fable5/museum-modal.tsx`
- **Test**: `components/fable5/__tests__/museum-modal.test.tsx`
- **Changes**:
  - Fixed imports (removed `useAnimeOnView`, added `useReducedMotion`)
  - Added `extractTweetIdFromUrl()` helper function
  - Added `getIframeSrc()` helper function
  - Updated iframe src to use `getIframeSrc(site)` instead of `site.demoUrl`
  - Added test case for X posts

### Slice 2: Syndication Fetcher Library ✅

- **File**: `scripts/lib/extract-fable5-media.ts`
- **Test**: `scripts/__tests__/extract-fable5-media.test.ts`
- **Functions**:
  - `fetchTweetMedia(statusId)` - Fetches syndication JSON
  - `pickMediaEntry(tweet)` - Extracts media URL
  - `downloadMedia(url, destPath)` - Downloads media file
  - `buildXEmbedUrl(statusId)` - Builds embed URL
  - `extractTweetIdFromUrl(url)` - Extracts status ID

### Slice 3: Orchestrator Script ✅

- **File**: `scripts/extract-fable5-media.ts`
- **Test**: `scripts/__tests__/extract-fable5-media-orchestrator.test.ts`
- **Features**:
  - Reads `data/fable5.ts`
  - Processes all 15 sites with concurrency limit (4)
  - Downloads media to `public/images/fable5/`
  - Generates `data/fable5-fixes.json` (manifest)
  - Generates `data/fable5-fixes.diff` (patch)
  - Handles edge cases (tombstoned, text-only, network errors)

### Slice 4: Open PR Script ✅

- **File**: `scripts/open-fable5-pr.ts`
- **Features**:
  - Creates git branch
  - Commits changes
  - Pushes to remote
  - Creates PR using `gh` CLI

## Fixtures

Four fixture files created in `scripts/__tests__/fixtures/`:

- `tweet-result-video.json` - Tweet with video media
- `tweet-result-photo.json` - Tweet with photo media
- `tweet-result-no-media.json` - Text-only tweet
- `tweet-result-tombstone.json` - Tombstoned/deleted tweet

## Usage

### Run the extraction

```bash
npm run fable5:extract-media
```

This will:

1. Read all 15 sites from `data/fable5.ts`
2. Fetch media from X syndication endpoint
3. Download media to `public/images/fable5/`
4. Generate `data/fable5-fixes.json` (manifest)
5. Generate `data/fable5-fixes.diff` (patch)

### Open the PR

```bash
npm run fable5:open-pr
```

This will:

1. Create a new git branch
2. Commit the changes
3. Push to remote
4. Create a PR using `gh` CLI

### Run tests

```bash
npm test
```

## Edge Cases Handled

- **Tombstoned tweets** (account limits): Marked as `failed` in manifest
- **Text-only tweets** (no media): Marked as `missing` in manifest
- **Network errors**: Marked as `failed` in manifest
- **Missing status ID**: Marked as `failed` in manifest
- **Download failures**: Marked as `failed` in manifest

## Architecture

The implementation follows a clean separation of concerns:

1. **Library** (`scripts/lib/extract-fable5-media.ts`): Low-level primitives
2. **Orchestrator** (`scripts/extract-fable5-media.ts`): Composes the library
3. **PR Script** (`scripts/open-fable5-pr.ts`): Handles git and GitHub

This makes each component testable in isolation and reusable.

## Next Steps

1. Review the generated manifest in `data/fable5-fixes.json`
2. Apply the diff from `data/fable5-fixes.diff` to `data/fable5.ts`
3. Run `npm run fable5:open-pr` to create the PR
4. Review and merge the PR

## Related Issues

- #129: PRD
- #130: Slice 1 (X-embed modal)
- #131: Slice 2 (syndication fetcher)
- #132: Slice 3 (orchestrator)
- #133: Slice 4 (open PR)
