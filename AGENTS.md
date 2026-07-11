# {{Project Name}}

> One-line product description. Replace with what this project actually is.

## For AI agents working in this codebase

This project follows a structured-context convention. Treat these as required context files and read them in order before doing any work. If your agent supports `@` imports, the lines below are import targets; otherwise, read the listed files explicitly with your normal file-reading tools.

@docs/context/thesis.md
@docs/context/project-overview.md
@docs/context/coding-standards.md
@docs/context/ai-interaction.md
@docs/context/delivery-workflow.md
@docs/context/current-feature.md

What each file is for:

| File | Purpose |
|---|---|
| [`docs/context/thesis.md`](./docs/context/thesis.md) | Why this product exists — strategy, beliefs, what we explicitly reject |
| [`docs/context/project-overview.md`](./docs/context/project-overview.md) | What we're building this quarter — scope, stack, surfaces, decisions log |
| [`docs/context/coding-standards.md`](./docs/context/coding-standards.md) | Coding style and rules |
| [`docs/context/ai-interaction.md`](./docs/context/ai-interaction.md) | How AI agents should communicate and collaborate in this project |
| [`docs/context/delivery-workflow.md`](./docs/context/delivery-workflow.md) | Pull-request, CI/CD, deployment, and post-merge verification rules |
| [`docs/context/current-feature.md`](./docs/context/current-feature.md) | The feature being worked on right now, plus the History of everything that's shipped |

## On-demand reference

- [`docs/specs/project-spec.md`](./docs/specs/project-spec.md) — deeper authoritative spec (schema, contracts, env keys). Read when implementation needs to ground in the source of truth.
- [`docs/context/features/*.md`](./docs/context/features/) — per-feature specs, one per shipped or in-flight feature.
- [`docs/context/backlog.md`](./docs/context/backlog.md) — items explicitly deferred from shipped features, indexed by category.

Collaboration rules live in [`docs/context/ai-interaction.md`](./docs/context/ai-interaction.md). Delivery commands and enforced gates live in [`docs/context/delivery-workflow.md`](./docs/context/delivery-workflow.md).

## Tool-specific notes

If you're working in **Claude Code**, this project also has:

- A `CLAUDE.md` at the root that uses `@`-import syntax to auto-load the six context docs every session.
- A `/feature` slash command (`spec` / `load` / `start` / `review` / `explain` / `complete`) for the lifecycle in `docs/context/ai-interaction.md`.
- A `/roadmap` slash command that reads roadmap/current-feature/backlog context and recommends the next feature without modifying files.
- A `/cleanup` slash command for periodic housekeeping scans.
- A `code-scanner` agent for parallelizable code-quality reviews.

If you're working in **Codex**, use the mirrored Open Skills commands from `.agents/skills/`:

- `$feature spec`, `$feature load`, `$feature start`, `$feature review`, `$feature explain`, `$feature complete`
- `$roadmap` for the read-only roadmap summary and next recommendation
- `$cleanup` for periodic housekeeping scans

`/feature` is Claude Code syntax; Codex discovers the same workflow as `$feature`.

If you're working in **another agent** (Cursor, Cline, Aider, Continue, etc.):

- The `@`-import syntax in `CLAUDE.md` is Claude Code-specific. **Read the six context docs manually** at the start of each session.
- Use project-local Open Skills such as `$feature`, `$roadmap`, and `$cleanup` when your agent supports them. Otherwise follow the same workflow manually.
- The `.claude/` directory contains Claude Code config; you can ignore it.

## Delivery rules

- Work on a non-default branch created from the current remote default branch.
- Verify the affected behavior through the closest real user path and run the configured quality gates.
- Review the complete branch diff before delivery.
- Open a pull request and wait for required CI and preview checks.
- Merge through GitHub. Never merge locally into or push directly to the default branch.
- Confirm the merged commit reaches production and the configured smoke check passes.
- Do not bypass required checks or branch protection.
