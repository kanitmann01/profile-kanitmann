import { render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";

import { BentoGitHubCard } from "@/components/bento-github-card";

const GITHUB_API = "https://api.github.com/users/kanitmann01";

function mockFetchOk() {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      public_repos: 23,
      followers: 3,
      created_at: "2025-01-16T00:00:00Z",
    }),
  });
}

function mockFetchNotOk() {
  return vi.fn().mockResolvedValue({ ok: false, status: 403 });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("BentoGitHubCard", () => {
  it("renders the card title", async () => {
    vi.stubGlobal("fetch", mockFetchOk());
    render(await BentoGitHubCard());
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("renders the link chip with cleaned path", async () => {
    vi.stubGlobal("fetch", mockFetchOk());
    render(await BentoGitHubCard());
    expect(screen.getByText("github.com/kanitmann01")).toBeInTheDocument();
  });

  it("renders the framing line about the projects", async () => {
    vi.stubGlobal("fetch", mockFetchOk());
    render(await BentoGitHubCard());
    expect(
      screen.getByText(/open-source data engineering and ML projects/i)
    ).toBeInTheDocument();
  });

  it("renders a link to the GitHub profile", async () => {
    vi.stubGlobal("fetch", mockFetchOk());
    render(await BentoGitHubCard());
    const link = screen.getByRole("link", { name: /view profile/i });
    expect(link).toHaveAttribute("href", "https://github.com/kanitmann01");
  });

  it("renders live stats from the GitHub API", async () => {
    const fetchMock = mockFetchOk();
    vi.stubGlobal("fetch", fetchMock);

    render(await BentoGitHubCard());

    expect(fetchMock).toHaveBeenCalledWith(
      GITHUB_API,
      expect.objectContaining({
        headers: { "User-Agent": "profile-kanitmann" },
        next: { revalidate: 21600 },
      })
    );
    expect(screen.getByText("23 repos")).toBeInTheDocument();
    expect(screen.getByText("3 followers")).toBeInTheDocument();
    expect(screen.getByText("since 2025")).toBeInTheDocument();
  });

  it("falls back to the static copy when the API returns a non-200", async () => {
    vi.stubGlobal("fetch", mockFetchNotOk());

    render(await BentoGitHubCard());

    expect(
      screen.getByText(/open-source data engineering and ML projects/i)
    ).toBeInTheDocument();
    expect(screen.queryByText("23 repos")).not.toBeInTheDocument();
  });

  it("falls back to the static copy when the fetch rejects", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down"))
    );

    render(await BentoGitHubCard());

    expect(
      screen.getByText(/open-source data engineering and ML projects/i)
    ).toBeInTheDocument();
    expect(screen.queryByText("3 followers")).not.toBeInTheDocument();
  });
});
