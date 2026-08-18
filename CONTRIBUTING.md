# Contributing

Keep additions portable and inspectable.

- Add a skill only when it has a named input, output, authority rule, and quality check.
- Do not embed credentials, company data, or provider-specific prices in the registry.
- A dashboard must define data lineage, freshness, visibility, and empty or error states.
- A UI artifact must define its user, task, data contract, commands, and visible states.
- A new DeepSeek Harness preset must use documented plugin rows and scoped skill discovery.
- Run `npm run validate` before opening a pull request.
