# Start Action

1. Read the repository instructions, delivery workflow, `current-feature.md`, and the linked feature or fix spec.
2. Confirm the work has concrete goals or acceptance criteria. If none exist, stop and ask the user to run `/feature load` in Claude Code or `$feature load` in Codex.
3. Confirm Git and an upstream remote exist before promising branch, commit, pull-request, or deployment behavior.
4. Inspect the worktree and preserve unrelated user changes. Do not stage, move, or overwrite them.
5. Fetch the upstream remote and determine its default branch. Start the feature branch from the current `origin/<default-branch>` unless project instructions require another base.
6. Create or switch to a non-default branch using the project's naming convention. Never implement feature work directly on the default branch.
7. Update the active feature status in place when the project uses one. Preserve the file's existing schema instead of replacing it with a fixed template.
8. List the goals, then implement the smallest complete behavior one goal at a time.
