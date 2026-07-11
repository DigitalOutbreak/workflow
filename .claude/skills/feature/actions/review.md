# Review Action

1. Read the repository instructions, delivery workflow, `current-feature.md`, and the linked spec to recover the intended behavior and constraints.
2. Determine the upstream default branch and review the complete branch diff from its merge base. Do not review only the latest commit.
3. Lead with actionable findings, ordered by severity and grounded in file and line references.
4. Check that goals and acceptance criteria are met, scope is focused, and no unrelated user changes are included.
5. Run the checks required by the repository's delivery workflow and CI configuration. A successful build alone is insufficient.
6. Reproduce and verify affected user-facing behavior through the closest real path when feasible, including relevant failure and loading states.
7. Identify remaining risk in security, permissions, tenant boundaries, data changes, integrations, migrations, and deployment behavior as applicable.
8. Finish with one verdict: `Ready for pull request` or `Needs changes`. List skipped or blocked verification explicitly.
