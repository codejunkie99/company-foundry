---
name: company-work-packet
description: Convert a company request into a bounded packet with explicit outcome, scope, authority, inputs, outputs, and checks.
---

# Company work packet

Create a packet before any material company task. Broad requests are not a grant to search every system or change every repository.

```yaml
id: customer-insight-q3
outcome: Explain why a defined customer segment chooses the product.
owner: product-and-growth
scope:
  sources: [approved-interviews, support-summaries]
  repositories: []
authority: prepare
required_artifacts: [evidence.yml, insight-brief.md, review.md]
quality_checks:
  - Every material claim cites a source reference.
  - Unknowns are separate from conclusions.
```

Authority has four levels: `observe`, `prepare`, `commit`, and `emit`. Default to `prepare`. When authority or scope is missing, ask before acting.

Finish with a run record: packet id, source references, skills loaded, model route, artifact paths, unresolved questions, and review state.
