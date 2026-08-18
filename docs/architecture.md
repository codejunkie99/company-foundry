# Architecture

![Architecture](../assets/architecture.svg)

Company Foundry has three layers.

**Company specification.** A structured record of identity, goals, source rules, authority, resources, and standards.

**Operating-method registry.** Versioned skills define work packets, evidence, routes, artifacts, UI, dashboards, and review.

**Runtime adapters.** DeepSeek Harness consumes native presets. Codex and Claude Code consume entry skills. A control plane can consume goals, budgets, approvals, and records. A runtime can consume agent and task configuration.

The registry does not replace runtime permissions. It describes what the runtime must enforce and records the result in artifacts.
