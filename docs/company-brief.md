# Company Brief

Use this file before creating a company-specific harness. Keep the information structured and scoped to the work the harness will perform.

```yaml
company:
  name: Example Company
  product: What the company sells and the important product terms.
  customers: Who it serves and how segments differ.
goals:
  - outcome: Learn why mid-market customers choose the product.
    owner: product-and-growth
evidence:
  approved_sources: [customer-interviews, support-summaries, crm-notes]
  restricted_sources: [raw-payment-data]
authority:
  default: prepare
  review_required_for: [commit, emit]
resources:
  repositories: [app-repository]
  applications: [operator-console]
  tools: [approved-browser, repository-tools]
standards:
  artifacts: [evidence-ledger, insight-brief, decision-record]
  material_claims_require_evidence: true
```

Do not put credentials, private keys, or unbounded data dumps in this file. The brief describes what the system may request, not a blanket grant to access it.

## The six required sections

1. **Identity.** What the company sells, who it is for, and what a worker should never assume.
2. **Goals.** Which outcomes are active now, and which ideas are merely interesting.
3. **Evidence.** Which sources are approved, reliable, current, and accessible.
4. **Authority.** What a worker may observe, prepare, change, or send.
5. **Resources.** Which repos, apps, tools, models, and data stores exist and what they cost.
6. **Standards.** What a finished artifact must contain and which claims or changes require review.

## Compiling the brief

The brief is compiled once and stays separate from the model conversation. A model can turn loose notes into a structured first pass and expose missing constraints:

- Preserve source wording when it is explicit.
- Write `UNKNOWN` when the notes do not support an answer.
- Add `needs_decision: true` when a human must choose.
- Never invent a customer claim, permission, budget, or success metric.

When a customer segment changes, update the company profile. When a source is no longer approved, update the source policy. When model economics change, update the model registry. The next relevant packet receives the new rule without rewriting every worker prompt.
