const TOKEN_PATTERNS: RegExp[] = [
  /ghp_[A-Za-z0-9]{36}/g,
  /github_pat_[A-Za-z0-9_]{22,}/g,
  /gho_[A-Za-z0-9]{36}/g,
  /ghs_[A-Za-z0-9]{36}/g,
  /ghr_[A-Za-z0-9]{36}/g,
  /AKIA[0-9A-Z]{16}/g,
  /Bearer\s+[A-Za-z0-9\-._~+/]{20,}/g,
  /sk-[A-Za-z0-9]{20,}/g,
];

export function scrubSecrets(text: string): string {
  if (!text) return text;

  let result = text;

  for (const pattern of TOKEN_PATTERNS) {
    result = result.replace(pattern, "[REDACTED]");
  }

  return result;
}
