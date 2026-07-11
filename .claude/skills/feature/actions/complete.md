# Complete Action

Deliver finished work through a pull request.
Never merge a feature branch locally into the default branch or push the default branch directly.

## 1. Confirm Readiness

1. Read the repository instructions, delivery workflow, `current-feature.md`, and the linked spec.
2. Confirm Git and an upstream remote exist and that the current branch is not the default branch.
3. Inspect the worktree and branch diff. Include only changes belonging to this feature; preserve unrelated user work.
4. Run the Review action and every required local quality check. Stop when a required check fails or the verdict is `Needs changes`.
5. Verify affected user-facing behavior through the real local or preview path required by the project.

## 2. Update Closure Context On The Feature Branch

1. Preserve the existing `current-feature.md` schema. Update it only when this branch is the active tracked feature; standalone chores must not overwrite another active feature.
2. Record a concise dated summary and verification evidence where the project keeps feature history.
3. Review the feature spec's deferred and out-of-scope items:
   - Add actionable follow-ups to `docs/context/backlog.md` when that file exists and the item is not already represented in the roadmap.
   - Remove backlog items completed by this feature.
   - Update the backlog's review date when its local convention requires it.
4. Update `docs/context/roadmap.md` only when the spec explicitly links a roadmap milestone. Ask before moving a milestone between phases or marking it shipped.
5. Follow project-specific release-note, migration, rollback, or operational-document requirements.

## 3. Commit And Open The Pull Request

1. Show `git status` and a concise diff summary before staging.
2. Stage intended paths explicitly. Do not use blanket staging when unrelated changes exist.
3. Treat an explicit `/feature complete` or `$feature complete` request as permission to commit the intended feature work, push its branch, and open or update its pull request. It does not authorize including unrelated files.
4. Use focused conventional commit messages without AI or agent attribution.
5. Push the feature branch to the upstream remote. Never push directly to the default branch.
6. Open or update a pull request that links the issue or spec and states:
   - Original intent and scope
   - What changed
   - Verification performed
   - Remaining risk or skipped checks

## 4. Checks, Preview, And Merge

1. Wait for every required status check and deployment preview defined by the project.
2. Fix failures on the feature branch and let the checks rerun. Never bypass branch protection or use an administrator override to force a merge.
3. Verify the affected workflow through the preview when the project provides one.
4. Present the pull-request URL, check results, verification evidence, and risk summary to the user.
5. Ask for merge approval unless the user explicitly included merge approval in the completion request.
6. Merge through the hosting provider using the repository's configured merge strategy. Do not perform a local merge into the default branch.

## 5. Verify Delivery

1. Confirm the pull request merged successfully.
2. Update the local default branch using a fast-forward-only pull, then remove the local feature branch when safe.
3. Confirm required post-merge CI, deployment, and production smoke checks pass.
4. Close or update the linked issue and project item only after delivery verification succeeds.
5. Report any incomplete deployment or post-merge failure instead of claiming the feature is complete.
