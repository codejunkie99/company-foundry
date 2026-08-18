---
name: company-code-delivery
description: Deliver a scoped code or app change with repository evidence, focused verification, reviewable artifacts, and explicit release authority.
---

# Company code delivery

Load `company-work-packet` first. Inspect existing files, tests, commands, and conventions before deciding how to change the application.

1. Map the affected path and acceptance criteria.
2. Write a small implementation plan.
3. Change only the approved scope.
4. Run the focused checks that prove the changed path.
5. Produce an artifact for review.

```yaml
packet: onboarding-flow-v1
files_changed: [path/to/file]
checks:
  - command: pnpm test -- relevant-test
    result: passed
authority_used: prepare
delivery_state: review-required
```

State checks that were not run. Do not merge, deploy, publish, or change production data without explicit authority.
