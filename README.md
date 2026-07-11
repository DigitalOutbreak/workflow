# workflow-init

A drop-in workflow scaffold for AI-assisted coding. Works with any agent that loads the [open agent skills](https://www.skills.sh) standard — Claude Code, Codex, Cursor, Gemini, Copilot, Cline, Windsurf, and ~12 more.

Ships with **two slash commands** and the surrounding scaffold:

| Command | For | What you get |
|---|---|---|
| `/workflow-init` | **Product apps** — anything with a database, auth, or a feature lifecycle | Strategy/spec docs + PR-first `/feature` lifecycle + framework-aware CI/CD + optional GitHub Project |
| `/site-init` | **Marketing sites** — agency sites, brand sites, landing pages, content sites | `site-brief.md` + `brand.md` + `pages.md` + `content-backlog.md` — and for existing sites, auto-inventory of every route in the repo |

Both ship with `AGENTS.md` / `CLAUDE.md` / `GEMINI.md` root briefs and a `/cleanup` housekeeping skill. `/workflow-init` additionally includes `/feature`, `/roadmap`, and a `code-scanner` agent.

Snapshot of the product workflow running in [DigitalOutbreak/digitaloutbreak-os](https://github.com/DigitalOutbreak/digitaloutbreak-os).

## Two-step setup, one for life

```sh
# 1. Install GLOBALLY — shows you a picker of every agent you have installed
npx skills add DigitalOutbreak/workflow -g

# 2. From any project dir, in your agent:
/workflow-init    # for product apps
/site-init        # for marketing sites
```

The first command uses the open [agent skills](https://www.skills.sh) ecosystem CLI:

- `-g` forces a **global** install. Without it the CLI auto-detects scope — if you happen to be standing in a git repo, it'd install project-local.
- The CLI then shows you a picker of every detected agent on your machine (Claude Code, Codex, Cursor, Gemini, Copilot, Windsurf, OpenCode, and ~10 more) so you can tick the ones you actually want. Press the spacebar to toggle, Enter to confirm.

The second is what you'll actually use every time you start a project.

### Skip the picker (install for all detected agents at once)

Add `-y` if you want one-shot install without picking:

```sh
npx skills add DigitalOutbreak/workflow -g -y
```

### Install project-local instead of global

Omit `-g` to install into the current project's `.agents/skills/` (skills are then checked into version control with the project):

```sh
npx skills add DigitalOutbreak/workflow
```

> Prefer our own CLI? Backwards-compat fallback:
> ```sh
> npx @digitaloutbreak/workflow        # interactive: pick from Claude / Codex / Gemini / Antigravity
> npx @digitaloutbreak/workflow --all  # install for Claude + Codex + Gemini + Antigravity, no prompts
> ```
> Same end result but smaller agent set — only Claude Code, Codex, Gemini, and Antigravity (vs ~15+ via `npx skills add`). `npx skills add` is preferred.

### Which one should I use?

| You're building... | Use |
|---|---|
| A product, dashboard, internal tool, SaaS, e-commerce backend, anything with a database or auth | `/workflow-init` |
| An agency site, brand site, landing page, content site, or any mostly-static marketing surface | `/site-init` |
| Not sure? | Ask yourself: *does this need a feature-spec lifecycle?* If yes, `/workflow-init`. If "I'll just edit pages and ship," `/site-init`. |

Existing sites work too — `/site-init` skips the framework scaffold for "Add workflow to existing site" and reads the repo to pre-fill `pages.md` from real route files.

### What `/site-init` does

Eight-stage bootstrap (~5 min). Slim by design:

1. **Idempotency check** — same Resume / Refresh / Re-inventory / Start fresh menu as `/workflow-init`
2. **Pre-flight** — new vs existing site, framework pick (Astro recommended), CMS pick (MDX vs headless)
3. **Scaffold** — only for new sites: `npm create astro@latest` / `create-next-app` / `sv create`
4. **Install template files** — drops `CLAUDE.md` + `AGENTS.md` + `GEMINI.md` + `docs/context/{site-brief,brand,pages,content-backlog,coding-standards,ai-interaction}.md` + `.claude/skills/cleanup/`
5. **Interview** — ~5 min: brand voice, audience, offer, conversion goal, 3 adjectives + 3 banned words, visual refs
6. **MCP decision** — SEO-focused (firecrawl, dataforseo, CMS MCPs if applicable). Install commands stashed in `site-brief.md`
7. **Inventory pages** (existing sites only) — reads `src/pages/`, `app/`, `src/routes/`, `src/content/` and pre-fills `pages.md` so you don't type out every URL
8. **Hand off** — MCP install commands + next-steps (open `brand.md`, fill primary CTAs in `pages.md`, run `/seo-audit` once deployed)

### What `/workflow-init` does

Ten-stage guided bootstrap (~5-15 min depending on how much you elaborate):

1. **Idempotency check** — detects prior runs in the target dir and offers Resume / Refresh / Start fresh / Abort
2. **Pre-flight** — asks the project type (Web / Backend-API / Mobile-Desktop / Other). For Web, it asks whether the project is AI-native. AI-native scaffolds use `npx -y ai-elements@latest`, which sets up the AI Elements + shadcn UI path and asks its own framework/component-library/preset prompts. Regular Web projects keep the Next.js / Astro / SvelteKit / TanStack Start + shadcn opt-in flow. If shadcn is enabled, it asks for a preset and defaults to `b0` on blank input, with retry handling if the installed CLI rejects that preset. Next.js + shadcn then asks whether to include starter UI; if yes, choose Minimal or Regular starter. Non-Web project types skip the scaffolder (you bring your own `cargo init` / `flutter create` / etc.)
3. **Install workflow files** — drops CLAUDE.md + AGENTS.md + GEMINI.md + `docs/context/` + `.claude/skills/` + `.agents/skills/` + `.claude/agents/code-scanner.md` into the project
4. **Discovery interview** — identity / stack / strategy / surfaces, with elaboration loops after every prose question so you can think out loud or jump straight to "move on"
5. **Repository, delivery, and MCP setup** — optionally connects GitHub, a GitHub Project, and hosting; generates framework-aware CI, dependency updates, a pull-request template, behavior/smoke tests where meaningful, and solo-safe branch-protection steps; then records MCP recommendations without installing them mid-interview.
6. **Roadmap proposal** — drafts a `Now` / `Next` / `Later` roadmap based on stack + strategy, iterates with you before saving. Skipped for existing projects
7. **Fill templates** — replaces `{{Placeholders}}` in all installed docs with your actual answers
8. **Recommend first feature** — picks the smallest thing from the roadmap's `Now` phase and offers to `/feature spec` it immediately
9. **Hand off** — MCP install commands appear here (safe to restart now; the interview is all on disk). Plus next-steps for `/feature` lifecycle

### Where the slash commands live, per agent

Both `/workflow-init` and `/site-init` install side-by-side:

- `~/.claude/skills/{workflow-init,site-init}/skill.md` — Claude Code (markdown + YAML frontmatter)
- `~/.agents/skills/{workflow-init,site-init}/SKILL.md` — **Codex AND Gemini CLI v0.43+** (the open agent-skills standard)
- `~/.gemini/config/skills/{workflow-init,site-init}/SKILL.md` — **Antigravity (Google)** — its global skills path

Codex and Gemini CLI both read from the same path — the open agent-skills standard at `~/.agents/skills/`. `--codex` and `--gemini` in the CLI both resolve to that path; the install is deduped so the same file isn't written twice.

> **Antigravity ≠ Gemini CLI.** Despite the shared "Gemini" name, Google's Antigravity does *not* read `~/.agents/skills/`. Its **global** skills live in `~/.gemini/config/skills/`, and **workspace** skills in `<project>/.agents/skills/`. The `--antigravity` flag writes to the global path. Antigravity also auto-discovers skills by context — there's no slash-command; describe the task or name the skill.

> Note: earlier versions of this CLI wrote a Gemini-specific TOML file at `~/.gemini/commands/<name>.toml`. That format predates the agent-skills standard and isn't used by modern Gemini CLI. If you have stale TOML files there from a prior install, you can delete them — they're harmless but inert.

| Tool | Invoke with |
|---|---|
| **Claude Code** | `/workflow-init` · `/site-init` |
| **Codex** | `$workflow-init` · `$site-init` (and project skills like `$feature`, `$roadmap`, `$cleanup`) |
| **Gemini CLI** | `/workflow-init` · `/site-init` |
| **Antigravity (Google)** | Describe the task, or name the `workflow-init` / `site-init` skill (no slash command) |

### Optional AI Elements scaffold

For new AI-native Web projects, `/workflow-init` asks:

> Is this an AI-native web app?

If yes, the scaffold step runs:

```sh
npx -y ai-elements@latest
```

The AI Elements CLI is interactive. It starts a new project when run from a directory without `package.json`, then asks for framework, project name, component library, and preset/theme. The workflow defaults to **Next.js**, **Radix**, and **Mira** when those choices are available and the user has no preference.

This path does not run the separate shadcn preset or starter UI flow. AI Elements is built on shadcn/ui, installs AI UI components into the generated project, and uses the CLI's live prompts for theme choices like Lyra/Mira.

### Optional shadcn starter UI

For shadcn projects, `/workflow-init` asks which preset to use. Press Enter to accept `b0`; users can create or browse presets at [ui.shadcn.com/create](https://ui.shadcn.com/create), click **Get Code**, and copy only the token between `--preset` and `--template` (for example, `b5eZT0sHS`). If the installed shadcn CLI rejects the chosen preset, the workflow uses the CLI's `Available presets:` list and asks you to pick a valid one.

For new **Next.js + shadcn** projects, `/workflow-init` also asks:

> Include starter UI?

If you answer yes, it asks which starter to install:

| Choice | Result |
|---|---|
| **Minimal** | Clones `arhamkhnz/next-shadcn-admin-dashboard`, then prunes it down to the sidebar shell and a blank dashboard page. |
| **Regular starter** | Clones `arhamkhnz/next-shadcn-admin-dashboard` as the full Studio Admin-style dashboard template. |

The starter template lands before workflow files are installed, so the project gets both the UI starting point and the workflow docs/skills in one run. This path uses the GitHub template directly, not `shadcn add`. Template-only media/screenshot assets are removed during install.

When a starter UI is selected, `/workflow-init` also documents the resulting colocation-first architecture. It references [`arhamkhnz/next-colocation-template`](https://github.com/arhamkhnz/next-colocation-template) so future agents understand the route-local `_components/` pattern used by the admin dashboard template.

### Optional GitHub and hosting setup

During `/workflow-init`, the agent asks whether to connect the project to GitHub and hosting now, record a plan only, or skip. GitHub setup asks **Public** vs **Private** before creating anything. Hosting choices include **Vercel**, **Cloudflare**, **Netlify**, **Other**, and **None**.

If the running agent has the right plugin, MCP, or authenticated CLI, it can create/link the repo, GitHub Project, or hosting project after confirmation. Otherwise it writes exact pending commands into the generated `README.md`, `docs/context/project-overview.md`, and `docs/context/delivery-workflow.md`.

### Built-in CI/CD baseline

For projects intended to ship, `/workflow-init` recommends a PR-first delivery baseline:

- A project-specific GitHub Actions workflow with a stable required check named `Quality`
- Only commands that exist and pass locally for the detected stack and package manager
- A small browser or executable smoke test for the real starter path when the stack supports one
- Weekly Dependabot updates for the detected ecosystem
- A pull-request template for intent, verification evidence, migrations, rollback, and remaining risk
- Protected `main` after the first successful `Quality` run, with zero mandatory approvals by default for a solo developer
- Deployment previews and an exact-commit production smoke check when the hosting provider can support them reliably

The generated [`docs/context/delivery-workflow.md`](./docs/context/delivery-workflow.md) explains the terms in plain language and records the actual commands and setup status. The skill marks unsupported or unfinished pieces as planned instead of pretending they exist.

### Other agents (Cursor, Cline, Aider, Continue, etc.)

`npx skills add DigitalOutbreak/workflow -g` already covers ~15 agents — the picker lists every one detected on your machine, including Cursor, Cline, Aider, Continue, Windsurf, OpenCode, and more. Tick the ones you want.

For agents that don't expose a slash-command mechanism yet, the install still drops `CLAUDE.md` + `AGENTS.md` + `GEMINI.md` + the six required context docs + `.claude/` into the project. Your agent reads its respective root file (`AGENTS.md` for Cursor/Cline/Aider/Continue, `GEMINI.md` for Gemini Code Assist, `CLAUDE.md` for Claude Code) and follows it to `docs/context/`.

You won't get the auto-interview / template-fill / first-feature pitch in those tools — that's driven by the slash-command skill. You'll edit the templates manually (or ask your agent to walk you through them).

### Target a specific path

`npx skills add` installs relative to your current working directory (project-local) or your home (`-g`). To install into a specific path, `cd` there first:

```sh
cd ./my-new-app
npx skills add DigitalOutbreak/workflow
```

> The legacy CLI (below) accepts a path argument directly: `npx @digitaloutbreak/workflow ./my-new-app`.

## What gets installed

### `/workflow-init` (product apps)

```
CLAUDE.md                            ← root brief, with @-imports (Claude Code)
AGENTS.md                            ← universal pointer for any AI agent
GEMINI.md                            ← Gemini Code Assist brief
docs/
├── context/                         ← auto-imported every session
│   ├── thesis.md                    [TEMPLATE — fill in]
│   ├── project-overview.md          [TEMPLATE — fill in]
│   ├── coding-standards.md          [STARTER — Next/TS/Tailwind v4 defaults]
│   ├── ai-interaction.md            [LITERAL — copy as-is]
│   ├── delivery-workflow.md          [FILLED — CI/CD commands, branch policy, deploy/smoke status]
│   ├── current-feature.md           [LITERAL — empty working file]
│   ├── backlog.md                   [LITERAL — empty index w/ categories]
│   ├── roadmap.md                   [FILLED — approved Now / Next / Later plan]
│   ├── features/                    ← per-feature specs land here
│   └── designs/                     ← screenshots, mockups, and visual references
└── specs/
    └── project-spec.md              [TEMPLATE — source-of-truth spec]
.claude/
├── agents/
│   └── code-scanner.md
└── skills/
    ├── feature/                     ← /feature  spec → complete lifecycle
    ├── roadmap/                     ← /roadmap  summary + next recommendation
    └── cleanup/                     ← /cleanup  housekeeping scan
.agents/
└── skills/
    ├── feature/                     ← Codex/Open Skills copy: $feature
    ├── roadmap/                     ← Codex/Open Skills copy: $roadmap
    └── cleanup/                     ← Codex/Open Skills copy: $cleanup
```

### `/site-init` (marketing sites)

```
CLAUDE.md                            ← root brief, with @-imports (Claude Code)
AGENTS.md                            ← universal pointer for any AI agent
GEMINI.md                            ← Gemini Code Assist brief
docs/
└── context/                         ← auto-imported every session
    ├── site-brief.md                [TEMPLATE — what the site is, who it's for, what it sells]
    ├── brand.md                     [TEMPLATE — voice, tone, words used/avoided, visual direction]
    ├── pages.md                     [TEMPLATE — page inventory; auto-filled for existing sites]
    ├── content-backlog.md           [TEMPLATE — planned pages, posts, case studies]
    ├── coding-standards.md          [STARTER — Astro/Next/SvelteKit + Tailwind defaults]
    └── ai-interaction.md            [LITERAL — copy as-is, no feature-spec lifecycle]
.claude/
└── skills/
    └── cleanup/                     ← /cleanup  housekeeping scan
.agents/
└── skills/
    └── cleanup/                     ← Codex/Open Skills copy: $cleanup
```

The starter's own `README.md`, `README.html`, `LICENSE`, `bin/`, `skill/`, `templates/`, and `package.json` are NOT installed — they describe the starter, not whatever project you're starting.

## What to fill in after install

### Product (`/workflow-init`)

Three files determine whether the AI context is useful or generic. Spend an hour on these and the rest compounds:

| File | What to write |
|---|---|
| `CLAUDE.md` | Replace `{{Project Name}}` and the one-line description. Keep this thin: imports and pointers only. |
| `docs/context/thesis.md` | Your strategic memo — why you're building this, the bet, the moat, the failure modes. |
| `docs/context/project-overview.md` | The polished summary auto-loaded every session — scope, stack, surfaces, decisions log. |
| `docs/context/coding-standards.md` | Project commands, layout, stack conventions, file organization, naming, and code quality. |
| `docs/context/delivery-workflow.md` | Exact local/CI commands, PR policy, branch protection, previews, production smoke, and rollback. |
| `docs/specs/project-spec.md` | Deeper authoritative spec — schema, contracts, env keys. Read on demand only. |

### Site (`/site-init`)

Three files set the agent up to write good copy and edit pages without drifting:

| File | What to write |
|---|---|
| `docs/context/site-brief.md` | What the site is, who it's for, what it sells, the single primary conversion event, the stack and key links. |
| `docs/context/brand.md` | Voice (3 adjectives + a paragraph in-voice), per-surface tone, words to use and avoid, palette and type tokens. |
| `docs/context/pages.md` | One row per URL. For existing sites, `/site-init` pre-fills URL / type / status from your repo — you add primary CTA and target keyword. |

The template files have `{{Placeholders}}` and bracketed `[Replace with...]` prompts plus scaffolding for the sections we've found load-bearing.

## How the workflow works

Three layers of context, loaded by need:

| Layer | Where | When loaded |
|---|---|---|
| **Auto-imported** | Six required `docs/context/*.md` files | Every session, via `@`-imports in `CLAUDE.md` |
| **Read on demand** | `docs/specs/`, `docs/context/features/`, `docs/context/backlog.md` | When the task makes them relevant |
| **Executed** | `.claude/skills/`, `.agents/skills/`, `.claude/agents/` | When invoked (slash commands, Codex `$` skills, Agent tool) |

Features ship through a PR-first loop:

```
/feature spec   →   /feature load   →   /feature start   →   (implement + verify)
                                                                      ↓
 production smoke  ←  merge through GitHub  ←  PR + CI + preview  ←  /feature complete
```

Each command has its own action file in `.claude/skills/feature/actions/`, mirrored to `.agents/skills/feature/actions/` for Codex/Open Skills. In Codex, invoke it as `$feature spec`, `$feature load`, `$feature start`, etc.; `/feature` is Claude Code syntax. Read [`docs/context/ai-interaction.md`](./docs/context/ai-interaction.md) (after install) for the full workflow rules.

Use `/roadmap` when you want the agent to read `roadmap.md`, `current-feature.md`, `backlog.md`, and `project-overview.md`, then tell you where the project stands and what it recommends next. It is read-only and does not start a feature.

## Per-agent root files

Three root-level briefs ship together — pick whichever your agent reads:

| File | For | Notes |
|---|---|---|
| `CLAUDE.md` | Claude Code | Imports `@AGENTS.md` plus the required `@docs/context/...` files. Root pointer only; commands/layout/workflow rules live in context docs. |
| `AGENTS.md` | Codex, Cursor, Cline, Aider, Continue, etc. | Universal contract with an explicit `@docs/context/...` required-context block, on-demand references, and Codex `$feature` notes. Workflow rules stay in `docs/context/ai-interaction.md`. |
| `GEMINI.md` | Gemini Code Assist and other Gemini-based agents | Same required-context block as AGENTS.md, addressed to Gemini specifically. |

The starter installs all three root files (CLAUDE.md / AGENTS.md / GEMINI.md) so collaborators on the same project can use whatever agent they prefer. All three point at the same six required context docs in `docs/context/`.

## Legacy CLI reference

The preferred install path is `npx skills add DigitalOutbreak/workflow -g` (see [Two-step setup](#two-step-setup-one-for-life) above). The legacy CLI below predates that ecosystem and is kept for backwards compatibility — it only supports Claude Code, Codex, Gemini, and Antigravity (vs ~15+ via `npx skills add`).

```
npx @digitaloutbreak/workflow                       Interactive — install both slash commands for chosen agents
npx @digitaloutbreak/workflow --all                 Install for Claude + Codex + Gemini + Antigravity, no prompts
npx @digitaloutbreak/workflow --claude              Just Claude Code (installs both /workflow-init and /site-init)
npx @digitaloutbreak/workflow --claude --gemini     Install for specific agents
npx @digitaloutbreak/workflow --antigravity         Just Antigravity (~/.gemini/config/skills/)
npx @digitaloutbreak/workflow --codex               Add Codex later, leave others
npx @digitaloutbreak/workflow init [target]         (advanced) Drop product-workflow files directly into target
npx @digitaloutbreak/workflow init-site [target]    (advanced) Drop marketing-site files directly into target
npx @digitaloutbreak/workflow --help                Show usage

# Pre-publish fallback (still works)
npx github:DigitalOutbreak/workflow                 Run straight from GitHub

# Backwards-compat alias
npx @digitaloutbreak/workflow --install-skill       Same as bare invocation
```

## Don't have npx?

Two fallback paths:

1. **Clone the repo and run the bash scripts directly:**
   ```sh
   git clone https://github.com/DigitalOutbreak/workflow.git ~/Developer/_starters/claude-workflow
   bash ~/Developer/_starters/claude-workflow/bin/init.sh ./my-app
   ```
2. **Install Node.js first** (https://nodejs.org/) — `npx` is bundled with every Node install ≥ 5.2.

## Customizing the starter

If you improve the workflow in a real project, bring the focused change back through a pull request:

```sh
# Example: improved /feature complete
gh repo clone DigitalOutbreak/workflow
cp ~/projects/my-app/.claude/skills/feature/actions/complete.md \
   workflow-init/.claude/skills/feature/actions/complete.md
cd workflow-init
git switch -c chore/improve-feature-complete
git add .claude/skills/feature/actions/complete.md
git commit -m "chore: improve feature completion workflow"
git push -u origin chore/improve-feature-complete
gh pr create
```

Bump the version in `package.json` and `npm publish` to roll out to everyone.

## What's NOT in this starter

| Missing | Why |
|---|---|
| Framework / `package.json` (for the target project) | Bring your own stack, unless you use `/workflow-init`'s optional Web scaffold or AI Elements path. |
| `.env*` files | Per-project secrets. |
| Schema / migrations / seed | Domain-specific. |
| UI components / shadcn primitives | Install per project, choose optional Next.js + shadcn starter UI, or use the AI Elements scaffold for AI-native apps. |
| `docs/handoffs/` | Project-specific by definition. |

## Visual how-to

[`README.html`](./README.html) has the visual version of this doc — color-coded file types, a stepper for the feature lifecycle, and the file inventory tree. Open locally after cloning:

```sh
open ./README.html
```

## License

MIT — see [LICENSE](./LICENSE).
