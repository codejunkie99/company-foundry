---
name: model-route-record
description: Record an eligible model tier, rationale, and fallback for a bounded company work packet.
---

# Model route record

This method records a route. It does not silently replace the current runtime model.

- `economy`: extraction, tagging, sorting, and broad first-pass coverage.
- `fast`: small interactive work and time-sensitive drafting.
- `capable`: difficult code, architecture, cross-source synthesis, and high-value decisions.

```yaml
packet: customer-insight-q3
requirements: [cross-source-synthesis, structured-artifact]
preference: quality
selected:
  tier: capable
  model: current-session-model
reason: The output compares approved evidence across sources.
fallback: [approved-capable-model, human-review]
```

Use a current company registry for provider, price, latency, availability, and quality information. When it is missing, record the property as unknown.
