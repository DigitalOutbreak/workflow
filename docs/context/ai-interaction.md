# AI Interaction Guidelines

## Communication

- Be concise and direct.
- Explain non-obvious decisions briefly.
- Ask before large refactors or architectural changes.
- Do not add features outside the active spec.
- Never delete files without clear approval.

## Workflow

Use this lifecycle for features and substantial fixes:

1. **Document** the intended behavior and acceptance criteria.
2. **Branch** from the current remote default branch.
3. **Implement** the smallest complete behavior.
4. **Verify** the affected user path and run the project quality gates.
5. **Review** the complete branch diff, including risk and scope.
6. **Commit** focused changes with a conventional message.
7. **Open a pull request** with intent, changes, evidence, and remaining risk.
8. **Wait for CI and preview checks** and fix failures on the branch.
9. **Merge through GitHub** after approval.
10. **Verify delivery** through the configured production smoke check.

Do not merge a feature branch locally into the default branch or push the default branch directly.
The project's exact commands, required checks, branch protection, deployment, and rollback path live in [`delivery-workflow.md`](./delivery-workflow.md).

## Workflow Skills

- Claude Code: `/feature`, `/roadmap`, `/cleanup`
- Codex and Open Skills agents: `$feature`, `$roadmap`, `$cleanup`
- `/feature` and `$feature` handle `spec`, `load`, `start`, `review`, `explain`, and `complete`.
- `/roadmap` and `$roadmap` summarize roadmap, current-feature, and backlog context without modifying files.
- `/cleanup` and `$cleanup` scan for housekeeping issues; they are read-only unless invoked with `run` or `fix`.

## Recommendation Handoff

The user does not have to type an exact command to start the workflow.

When recommending work, classify it first and propose the matching path:

- New user-facing capability: feature, then `/feature spec <slug>` or `$feature spec <slug>`
- Broken or incorrect existing behavior: fix, then `/feature spec fix:<slug>` or `$feature spec fix:<slug>`
- Refactor, dependency, cleanup, docs, or tooling: `chore/<slug>` branch; no feature spec unless requested

If the user approves the recommendation in plain language, treat that as approval to run the proposed path.
Ask a short clarification only when the classification is genuinely ambiguous.

## Branching

- **Features:** `feature/<slug>` branches tracked in `docs/context/features/<slug>-spec.md`.
- **Bug fixes:** `fix/<slug>` branches. Do not add routine fixes to the roadmap or feature history.
- **Refactors and chores:** `chore/<slug>` branches unless they are part of an active feature.
- Always inspect the worktree before branching and preserve unrelated user changes.
- Fetch the upstream remote and start from the current remote default branch.

## Backlog Ownership

`docs/context/backlog.md` tracks actionable work deferred from shipped changes, not every idea.

- Feature completion removes backlog items that shipped and adds meaningful deferred follow-ups not already represented in the roadmap.
- Fixes and chores update backlog only when they resolve an existing item or create a follow-up worth remembering.
- Tiny polish, copy changes, dependency bumps, and local cleanup should not create backlog entries unless the user asks to track them.
- Surface stale or conflicting backlog entries during cleanup instead of silently rewriting them.

## Commits And Pull Requests

- Do not commit, push, merge, or deploy without user instruction or a workflow action that explicitly grants that step.
- Treat an explicit `/feature complete` or `$feature complete` request as permission to commit intended feature files, push the branch, and open or update its pull request.
- Keep commits focused and use conventional prefixes such as `feat:`, `fix:`, `docs:`, and `chore:`.
- Never add AI or agent attribution to commits, pull requests, changelogs, or project files unless explicitly requested.
- Do not include unrelated working-tree changes in the branch or pull request.

## When Stuck

- If the same problem remains after two or three serious attempts, stop and explain the blocker and evidence.
- Do not keep trying random fixes.
- Ask for clarification when the requirement materially changes the implementation or risk.

## Code Changes

- Make the smallest change that genuinely solves the task.
- Preserve existing codebase patterns and ownership boundaries.
- Do not add unrelated refactors, abstractions, dependencies, or nice-to-have features.
- Add tests when the change affects shared logic, cross-module behavior, security-sensitive code, or a user-facing workflow.

## Code Review

Review generated code for:

- Security, authentication, authorization, and tenant boundaries
- Data migrations, destructive operations, and rollback paths
- Logic errors and edge cases
- Performance regressions and unnecessary work
- Alignment with the spec and existing patterns
- Real user behavior, including loading, empty, error, and permission states when applicable
