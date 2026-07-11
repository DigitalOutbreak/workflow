"use strict";

const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const ROOT = path.resolve(__dirname, "..");
const CLI = path.join(ROOT, "bin", "cli.js");
const SHELL_INSTALLER = path.join(ROOT, "bin", "init.sh");

function temporaryDirectory(name) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `workflow-${name}-`));
}

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: options.cwd || ROOT,
    encoding: "utf8",
    env: { ...process.env, NO_COLOR: "1" },
  });
}

function expectFile(root, relativePath) {
  const absolutePath = path.join(root, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `missing ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

function topLevelFrontmatterKeys(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, "skill is missing YAML frontmatter");
  return match[1]
    .split("\n")
    .map((line) => line.match(/^([a-z][\w-]*):/i))
    .filter(Boolean)
    .map((entry) => entry[1]);
}

test("product preset installs PR-first workflow files for Claude and Open Skills agents", () => {
  const target = temporaryDirectory("product");
  const result = run(process.execPath, [CLI, "init", target]);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  expectFile(target, "docs/context/delivery-workflow.md");
  expectFile(target, ".claude/skills/roadmap/skill.md");
  expectFile(target, ".agents/skills/roadmap/SKILL.md");

  const completeAction = expectFile(
    target,
    ".agents/skills/feature/actions/complete.md"
  );
  assert.match(completeAction, /Deliver finished work through a pull request/);
  assert.match(completeAction, /Verify Delivery/);

  const secondRun = run(process.execPath, [CLI, "init", target]);
  assert.equal(secondRun.status, 2);
  assert.match(secondRun.stderr, /refusing to overwrite/);
});

test("site preset installs from the packaged site template source", () => {
  const target = temporaryDirectory("site");
  const result = run(process.execPath, [CLI, "init-site", target]);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  expectFile(target, "docs/context/site-brief.md");
  expectFile(target, "docs/context/brand.md");
  expectFile(target, ".claude/skills/cleanup/skill.md");
  expectFile(target, ".agents/skills/cleanup/SKILL.md");
});

test("bash fallback mirrors the product preset and Open Skills copies", () => {
  const target = temporaryDirectory("shell");
  const result = run("bash", [SHELL_INSTALLER, target]);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  expectFile(target, "docs/context/delivery-workflow.md");
  expectFile(target, ".agents/skills/feature/SKILL.md");
  expectFile(target, ".agents/skills/roadmap/SKILL.md");
});

test("npm artifact contains and can execute both preset sources", () => {
  const artifactDirectory = temporaryDirectory("artifact");
  const result = run("npm", [
    "pack",
    "--json",
    "--pack-destination",
    artifactDirectory,
  ]);
  assert.equal(result.status, 0, result.stderr || result.stdout);

  const report = JSON.parse(result.stdout);
  const files = new Set(report[0].files.map((entry) => entry.path));

  assert.equal(files.has("templates/site/AGENTS.md"), true);
  assert.equal(files.has("docs/context/delivery-workflow.md"), true);
  assert.equal(files.has(".claude/skills/roadmap/skill.md"), true);
  assert.equal(files.has(".claude/skills/feature/actions/complete.md"), true);

  const archive = path.join(artifactDirectory, report[0].filename);
  const extractResult = run("tar", [
    "-xzf",
    archive,
    "-C",
    artifactDirectory,
  ]);
  assert.equal(
    extractResult.status,
    0,
    extractResult.stderr || extractResult.stdout
  );

  const packedCli = path.join(artifactDirectory, "package", "bin", "cli.js");
  const siteTarget = temporaryDirectory("packed-site");
  const siteResult = run(process.execPath, [packedCli, "init-site", siteTarget]);
  assert.equal(siteResult.status, 0, siteResult.stderr || siteResult.stdout);
  expectFile(siteTarget, "docs/context/site-brief.md");
});

test("shipped skills use valid Open Skills frontmatter keys", () => {
  const allowedKeys = new Set([
    "allowed-tools",
    "description",
    "license",
    "metadata",
    "name",
  ]);
  const skillFiles = [
    "skills/workflow-init/SKILL.md",
    "skills/site-init/SKILL.md",
    ".claude/skills/feature/skill.md",
    ".claude/skills/roadmap/skill.md",
    ".claude/skills/cleanup/skill.md",
  ];

  for (const relativePath of skillFiles) {
    const content = expectFile(ROOT, relativePath);
    const keys = topLevelFrontmatterKeys(content);
    assert.equal(keys.includes("name"), true, `${relativePath} needs name`);
    assert.equal(
      keys.includes("description"),
      true,
      `${relativePath} needs description`
    );
    assert.deepEqual(
      keys.filter((key) => !allowedKeys.has(key)),
      [],
      `${relativePath} has unsupported frontmatter keys`
    );
  }
});
