---
name: roadmap
description: Summarize the project roadmap and recommend the next feature to work on
metadata:
  internal: true
---

# Roadmap Review

Read the project context and tell the user where the project stands, what the roadmap says, and what you recommend doing next.

This command is read-only. Do not edit files, create branches, run scaffolding, start a feature, commit, push, or deploy.

## Inputs

Read these files if they exist:

1. `docs/context/roadmap.md` — primary source for Now / Next / Later.
2. `docs/context/current-feature.md` — active feature and shipped history.
3. `docs/context/backlog.md` — deferred items and known follow-ups.
4. `docs/context/project-overview.md` — product scope, v1 surfaces, stack, repo/deploy status.
5. `docs/specs/project-spec.md` — only if the roadmap or overview is too vague.

Also run lightweight read-only checks when useful:

```bash
git status --short --branch
find docs/context/features -maxdepth 1 -type f | sort
```

If a file is missing, say so briefly and continue from the available context.

## Mode

Argument: `$ARGUMENTS`

- No argument or `next`: recommend the next best feature.
- `summary`: summarize roadmap state only, with no recommendation.
- `full`: give roadmap state, shipped history, backlog pressure, and next recommendation.

## Output

Keep the answer concise and useful:

1. **Roadmap state** — summarize Now / Next / Later in plain language.
2. **Current state** — active feature, last shipped item, repo/deploy status if known.
3. **Recommendation** — one next feature or task, with a short reason.
4. **Why this next** — what it proves, what dependency it unblocks, or what risk it reduces.
5. **Suggested command** — usually `/feature spec <slug>` in Claude Code or `$feature spec <slug>` in Codex if the next step should become a feature.

If the roadmap is empty or generic, do not invent confidence. Say what is missing and recommend the smallest clarification step, such as:

> "The roadmap is not specific enough yet. Next best step: update `docs/context/roadmap.md` with 3-5 Now items before starting implementation."

## Selection Rules

Choose the next recommendation using this order:

1. Finish an active `current-feature.md` item before starting a new one.
2. If no active feature, pick the smallest item in the roadmap's Now section that proves the core product bet.
3. Prefer foundational contracts before UI polish: types, schema, seed data, auth boundary, shell, then first real surface.
4. Prefer one vertical end-to-end slice over broad horizontal setup.
5. Pull from `backlog.md` only when it blocks a Now item or fixes a real regression.

Never present the recommendation as mandatory. Phrase it as a recommendation the user can accept, edit, or reject.
