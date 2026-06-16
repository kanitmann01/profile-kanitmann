import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { SubmitSiteButton } from "../submit-site-button";

describe("SubmitSiteButton", () => {
  it("renders a link with the default children", () => {
    render(<SubmitSiteButton />);
    expect(
      screen.getByRole("link", { name: "Submit a site" })
    ).toBeInTheDocument();
  });

  it("renders the pre-filled GitHub Issue URL with the submission template", () => {
    render(<SubmitSiteButton />);
    const link = screen.getByRole("link", { name: "Submit a site" });
    const href = link.getAttribute("href") ?? "";
    expect(href).toMatch(
      /^https:\/\/github\.com\/kanitmann01\/profile-kanitmann\/issues\/new\?template=fable5-submission\.md/
    );
  });

  it("opens the link in a new tab with no opener", () => {
    render(<SubmitSiteButton />);
    const link = screen.getByRole("link", { name: "Submit a site" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
