export function calculateReadingTime(text: string): number {
  const stripped = text.replace(/<[^>]*>/g, "");
  const words = stripped.trim().split(/\s+/).filter(Boolean);
  const minutes = Math.ceil(words.length / 225);
  return Math.max(1, minutes);
}
