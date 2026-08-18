---
name: company-ui-artifact
description: Turn a company work packet into a usable UI with explicit users, tasks, data contracts, states, implementation details, and verification evidence.
---

# Company UI artifact

Load `company-work-packet` before designing or implementing an interface. Begin with the operating task, not a visual style.

```yaml
audience: product-operator
job: Review customer evidence and approve a product decision brief.
primary_action: approve-or-return-for-revision
entities: [work-packet, evidence-ledger, insight-brief, review]
views: [queue, artifact-detail, review]
permissions:
  viewer: inspect
  reviewer: approve-or-return
```

For every view, define the decision it supports, every field's source, commands and required authority, loading, empty, partial, error, permission-denied, and stale-data states, plus narrow and wide layout behavior.

Create `ui-brief.yml`, `information-architecture.md`, `data-contract.yml`, `state-matrix.md`, `implementation.md`, and `verification.md`. Use real data or clearly labelled fixtures. Do not ship a decorative landing page when the requested product is an operating tool.
