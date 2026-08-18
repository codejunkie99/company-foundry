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
