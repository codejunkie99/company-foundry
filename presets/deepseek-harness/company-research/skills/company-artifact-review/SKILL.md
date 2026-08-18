---
name: company-artifact-review
description: Package company work as a reviewable artifact with provenance, evidence, authority, unresolved questions, and a recorded review state.
---

# Company artifact review

An answer in a chat is not a company artifact. Create a directory that another worker can inspect:

```text
artifacts/<slug>/
  brief.md
  evidence.yml
  model-route.yml
  run.yml
  review.md
```

`run.yml` records packet id, model, skills, inputs, outputs, authority, and completion time. `review.md` states the supported decision, material evidence, uncertainty, review owner, and one of `draft`, `review-required`, `approved`, `rejected`, or `superseded`.

Never mark an artifact approved unless a policy or named reviewer approved it.
