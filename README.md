# Company Foundry

> Compile one company brief into scoped work, skills, routes, evidence, artifacts, and reviews.

![Company Foundry architecture](assets/company-foundry.svg)

Company Foundry is a portable operating-method registry for AI-native companies. It does not pretend that an agent is a company. It makes each important job explicit: why the work exists, what it may read, what it may change, which model tier fits, what artifact it must produce, and how someone reviews it.

The first native target is DeepSeek Harness. The same skill contracts also work with Codex and Claude Code.

## Start here

1. Create a company brief from [the template](docs/company-brief.md).
2. Select one closed workflow, such as customer evidence to a product decision brief.
3. Install one DeepSeek Harness preset from `presets/deepseek-harness/`.
4. Use the matching skill and keep its output under `artifacts/`.
5. Add a native service only after the file-based workflow is useful and stable.

## What the repository contains

| Path | Purpose |
| --- | --- |
| `registry/` | Stable registry for skills, artifact types, authority, and model-routing records. |
| `skills/` | Portable, detailed operating methods for research, code, apps, UI, dashboards, and review. |
| `presets/deepseek-harness/` | Native scoped presets that load the appropriate skill set. |
| `adapters/` | Small entry skills for Codex and Claude Code. |
| `docs/` | Architecture, brief, and artifact rules. |
| `assets/` | Ten SVG diagrams for the README, docs, and presentations. |

## The operating loop

```text
company brief -> work packet -> scoped context -> skill -> model route
              -> run -> evidence -> artifact -> review -> decision
```

Each stage leaves a file. That gives the next worker an inspectable starting point instead of a hidden chat history.

## Authority

| Level | Meaning |
| --- | --- |
| `observe` | Read approved information. |
| `prepare` | Create drafts and isolated work. |
| `commit` | Change internal company state. |
| `emit` | Send or publish outside the company. |

The default is `prepare`. A skill never grants `commit` or `emit` by itself.

## DeepSeek Harness

Copy either directory under `presets/deepseek-harness/` to `${DSH_HOME:-$HOME/.dsh}/.agent-presets/`.

- `company-research` loads evidence and dashboard skills.
- `company-builder` loads code, UI, dashboard, routing, and review skills.

The presets use DeepSeek Harness's existing sandbox, permission, session, and model-provider services. They do not hard-pin a model. Use a model registry and a recorded route to choose Kimi K3, another capable model, a fast model, or an economy model for a packet.

## Codex and Claude Code

Copy `adapters/codex/company-harness/` into a Codex skill root and `adapters/claude-code/company-harness/` into a Claude Code skill root. Both adapters point to the portable registry and require the same artifact contracts.

## Verify

```sh
npm run validate
```

This checks registry structure, skill frontmatter, preset metadata, and the eleven SVG assets. It does not validate a running DeepSeek Harness installation; use the harness's own preset mount check for that.

## Scope

Company Foundry is an operating-method layer. It is not an autonomous CEO, a hidden permission system, or a replacement for a company control plane. It makes the company method portable so a runtime can enforce it.
