import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { BentoExperienceCard } from "@/components/bento-experience-card";
import { homeExperiences } from "@/data/experiences";

describe("BentoExperienceCard", () => {
  it("renders the card title", () => {
    render(<BentoExperienceCard experiences={homeExperiences} />);
    expect(screen.getByText("My Experience")).toBeInTheDocument();
  });

  it("renders the link chip with cleaned path", () => {
    render(<BentoExperienceCard experiences={homeExperiences} />);
    expect(screen.getByText("/about/experience")).toBeInTheDocument();
  });

  it("renders position for each rendered experience entry", () => {
    render(<BentoExperienceCard experiences={homeExperiences} />);
    // The compact card renders only the top 5 featured experiences.
    const renderedExperiences = homeExperiences.slice(0, 5);
    for (const exp of renderedExperiences) {
      const title = exp.position || exp.roles?.[0]?.position;
      if (title) {
        expect(screen.getByText(title)).toBeInTheDocument();
      }
    }
  });

  it("renders company names", () => {
    render(<BentoExperienceCard experiences={homeExperiences} />);
    expect(screen.getAllByText("Ericsson").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("NetSTAR Global")).toBeInTheDocument();
    expect(screen.getByText("Trikon Technologies")).toBeInTheDocument();
  });
});
