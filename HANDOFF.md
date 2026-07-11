# Workflow Package Handoff

> Current as of 2026-07-11.
> Read [`DEVELOPING.md`](./DEVELOPING.md) first for the maintained repository map, commands, release process, and gotchas.

## Current release state

- Published npm version before this branch: `0.17.0`
- Repository `main` was still at `0.16.0` when work began.
- The `0.17.0` npm artifact was reconciled into this branch before new work was added.
- This branch prepares `0.18.0` with PR-first delivery and CI/CD bootstrap support.

## 0.18.0 scope

- Add `docs/context/delivery-workflow.md` to product projects.
- Change `/feature complete` to open a pull request, wait for required checks and previews, merge through GitHub, and verify delivery.
- Teach `/workflow-init` to configure project-specific CI, behavior or executable smoke tests, Dependabot, a pull-request template, optional GitHub Project tracking, solo-safe branch protection, and post-merge smoke checks where the hosting provider supports exact-commit verification.
- Add CI and generator tests for this package itself.
- Publish `templates/site/` so `init-site` works from the npm artifact.

## Release process

1. Run `npm test`.
2. Run `npm run test:smoke`.
3. Run `npm audit --omit=dev`.
4. Run `npm run test:pack` and inspect the artifact list.
5. Push the feature branch and open a pull request.
6. Wait for the required `Quality` check.
7. Merge through GitHub without bypassing protection.
8. Fast-forward local `main` and run `npm publish` from the merged source.
9. Verify `npm view @digitaloutbreak/workflow version` and install both presets from the published version in temporary directories.

Never publish from uncommitted source or from a branch that is not represented on GitHub.

## Invariants

1. MCP installation stays at Stage 9 so an agent restart cannot erase the discovery interview.
2. Product CI commands come from the target repository's real scripts and lockfile.
3. The required check name stays `Quality` so branch protection remains stable.
4. A solo developer defaults to zero mandatory approving reviews, while CI, conversation resolution, current-branch enforcement, administrator enforcement, and force-push/deletion blocks remain active.
5. `docs/context/roadmap.md` is the product-planning source of truth; an optional GitHub Project is the execution view.
6. `site/` is the package marketing site and does not ship. `templates/site/` is runtime scaffold input and must ship.

## Verification targets

The package test suite must prove:

- Product init creates Claude and Open Skills copies, including `/roadmap` and the PR-first `/feature complete` action.
- Site init can read its packaged template source.
- The Bash fallback mirrors the product preset.
- The npm artifact contains product docs, feature actions, roadmap skill, and site templates.
