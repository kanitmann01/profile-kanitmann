---
name: Fable 5 Site Submission
description: Submit a Claude Fable 5 build to be featured in the museum
title: "[Fable 5] "
labels: ["fable5-submission", "needs-triage"]
---

- type: input
  id: site-url
  attributes:
  label: Site URL
  description: Direct link to the deployed Fable 5 build (must be a valid URL)
  validations:
  required: true
- type: input
  id: demo-url
  attributes:
  label: Demo URL
  description: Live demo link, if different from the site URL
  validations:
  required: false
- type: input
  id: author-handle
  attributes:
  label: Author X handle
  description: X handle of the site author, no @ (e.g. coldopn)
  validations:
  required: true
- type: input
  id: your-handle
  attributes:
  label: Your X handle
  description: X handle of whoever is submitting (e.g. kanitmann01), optional
  validations:
  required: false
- type: textarea
  id: description
  attributes:
  label: One-line description
  description: A single sentence describing the build
  placeholder: e.g. Real-time Three.js fluid simulation built in a single prompt
  validations:
  required: true
- type: dropdown
  id: tags
  attributes:
  label: Tags
  description: Select all tags that apply
  options: - 3d - shader - game - tooling - art - agent - webgl - sim - email
  multiple: true
  validations:
  required: true
- type: dropdown
  id: type
  attributes:
  label: Type
  description: What kind of build is this?
  options: - Demo - Tutorial - Evaluation - Integration
  validations:
  required: true
- type: checkboxes
  id: author-credits
  attributes:
  label: Author credits
  description: Confirm attribution before submitting
  options: - label: I confirm the author is credited and the link is public
  required: true
- type: textarea
  id: anything-else
  attributes:
  label: Anything else?
  description: Optional notes, caveats, or links
  validations:
  required: false
