---
name: customer-evidence-research
description: Produce a source-led customer research artifact that separates evidence, claims, inference, uncertainty, and next actions.
---

# Customer evidence research

Load `company-work-packet` first. Build an evidence ledger before writing conclusions. Generated summaries are analysis, not sources.

```yaml
sources:
  - id: interview-014
    type: customer-interview
    location: approved-reference
    access: approved
claims:
  - id: claim-001
    statement: Teams choose the product to reduce manual handoffs.
    sources: [interview-014]
    status: supported
```

Create `artifacts/<slug>/insight-brief.md` with: question, evidence, supported conclusions, inference, open questions, recommended next action, and review status.

Do not update customer records, send research, or make a product decision without packet authority and the required review.
