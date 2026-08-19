import { describe, it, expect } from "vitest";
import { experiences, homeExperiences } from "../experiences";

describe("experiences data file (order is the source of truth)", () => {
  it("leads with the Coforge role", () => {
    const coforge = experiences[0];
    expect(coforge.id).toBe("coforge");
    expect(coforge.company).toBe("Coforge");
    expect(coforge.position).toBe("Associate Forward Deployed Engineer");
    expect(coforge.type).toBe("Full-time");
    expect(coforge.endDate).toBe("Present");
    expect(coforge.featuredOnHome).toBe(true);
  });

  it("derives homeExperiences as the featured subset in data-file order", () => {
    const featuredIds = experiences
      .filter((experience) => experience.featuredOnHome)
      .map((experience) => experience.id);
    expect(homeExperiences.map((experience) => experience.id)).toEqual(
      featuredIds
    );
    expect(homeExperiences[0].id).toBe("coforge");
  });

  it("puts the five companies the home card slices first", () => {
    expect(homeExperiences.slice(0, 5).map((experience) => experience.id)).toEqual(
      [
        "coforge",
        "invisible-technologies",
        "mercor",
        "netstar",
        "ericsson",
      ]
    );
  });
});
