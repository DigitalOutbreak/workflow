---
name: feature
description: Manage current feature workflow - spec, load, start, review, explain or complete
metadata:
  internal: true
---

# Feature Workflow

Manages the full lifecycle of a feature from spec to merge.

## Project Context

Use `docs/context/current-feature.md` when it exists, but preserve its existing structure.
Before changing source control or delivery state, read the repository's `AGENTS.md`, `docs/context/delivery-workflow.md`, and other project-specific instructions.
Project instructions take precedence over the generic action defaults in this skill.

## Task

Execute the requested action: $ARGUMENTS

| Action     | Description                                                                               |
| ---------- | ----------------------------------------------------------------------------------------- |
| `spec`     | Author a new feature/fix spec via a short interview, save to `docs/context/features/`     |
| `load`     | Load a feature spec or inline description                                                 |
| `start`    | Begin implementation from an updated default branch                                       |
| `review`   | Check goals, scope, behavior, risk, and project quality gates                             |
| `explain`  | Document what changed and why                                                             |
| `complete` | Prepare closure context, open a PR, pass checks, merge with approval, and verify delivery |

See [actions/](actions/) for detailed instructions.

If no action provided, explain the available options.
