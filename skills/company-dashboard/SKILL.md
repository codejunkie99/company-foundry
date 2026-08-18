---
name: company-dashboard
description: Build an inspectable operational dashboard with metric definitions, data lineage, freshness, permissions, states, and verification evidence.
---

# Company dashboard

Load `company-work-packet` first. A dashboard supports named decisions; it is not a collection of cards.

```yaml
title: Customer evidence review
audience: product-and-growth
decisions: [choose-next-segment]
metrics:
  - id: supported-claims
    definition: Count of claims with an inspectable source reference.
    source: evidence-ledger
    owner: product-and-growth
    freshness: updated-with-artifact
states: [loading, empty, partial-data, permission-denied, error, ready]
```

Every metric needs a definition, source, owner, freshness expectation, and visibility rule. Never show generated estimates as measured company facts. Prefer a table for comparison or audit. Use a chart only when it makes a real relationship easier to see.

Deliver `dashboard.yml`, `metric-definitions.md`, `view-spec.md`, and `verification.md`. Link a decision metric to its source artifact where the application supports it.
