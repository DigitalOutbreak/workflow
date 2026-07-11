# {{Project Name}}

> One-line product description. Replace with what this project actually is.

## For Gemini agents working in this codebase

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

If you're working in **Gemini Code Assist** or another Gemini-based agent:

- Read all six context docs at session start. This project doesn't rely on any Gemini-specific auto-import mechanism; explicit reading is the contract.
- The `.claude/` directory contains Claude Code config; you can ignore it.
- Slash commands like `/feature`, `/roadmap`, and `/cleanup` are Claude Code-specific. If your agent supports Open Skills from `.agents/skills/`, use `$feature`, `$roadmap`, and `$cleanup`; otherwise follow `docs/context/ai-interaction.md` manually.

If you're working in a non-Gemini agent (Claude Code, Cursor, Cline, Aider, Continue, etc.):

- See [`AGENTS.md`](./AGENTS.md) for the universal pointer or [`CLAUDE.md`](./CLAUDE.md) for the Claude Code-specific version with `@`-imports.
