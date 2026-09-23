'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const home = process.env.CODEX_HOME || path.join(os.homedir(), '.codex');
const target = path.join(home, 'skills', 'jev');
for (const dir of ['src/jev', 'scripts', 'agents']) fs.mkdirSync(path.join(target, dir), { recursive: true });
for (const file of ['client.cjs', 'index.cjs']) {
  fs.copyFileSync(path.join(root, 'src/jev', file), path.join(target, 'src/jev', file));
}
fs.copyFileSync(path.join(root, 'scripts/jev-global.cjs'), path.join(target, 'scripts/judge.cjs'));
fs.copyFileSync(path.join(root, 'docs/jev-skill.md'), path.join(target, 'SKILL.md'));
fs.writeFileSync(path.join(target, 'agents/openai.yaml'), 'interface:\n  display_name: "Jev 1.13"\n  short_description: "Bounded app and website judgments via OpenRouter"\n  default_prompt: "Use $jev to evaluate this decision against explicit project criteria."\npolicy:\n  allow_implicit_invocation: true\n');
fs.writeFileSync(path.join(target, 'package.json'), JSON.stringify({ name: 'codex-jev-local', private: true,
  version: '1.13.0', dependencies: { '@typesafe-ai/sdk': '0.6.0' }, engines: { node: '>=20' } }, null, 2));
fs.writeFileSync(path.join(target, '.gitignore'), 'node_modules/\n.env\n.env.*\n*jev777*\n');
// npm's existing lock pins the same dependency used by this project.
const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
lock.name = 'codex-jev-local'; lock.version = '1.13.0';
lock.packages[''].name = lock.name; lock.packages[''].version = lock.version;
fs.writeFileSync(path.join(target, 'package-lock.json'), JSON.stringify(lock, null, 2));
const install = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['ci', '--ignore-scripts', '--no-fund'], { cwd: target, stdio: 'inherit', shell: process.platform === 'win32' });
if (install.status !== 0) process.exit(install.status || 1);
const instructions = path.join(home, 'AGENTS.md');
const current = fs.existsSync(instructions) ? fs.readFileSync(instructions, 'utf8') : '';
const marker = '## Jev for app and website work';
if (!current.includes(marker)) {
  fs.appendFileSync(instructions, `\n${marker}\n\n- Across app and website projects, consult the Jev skill at ${path.join(target, 'SKILL.md').replace(/\\/g, '/')} at meaningful bounded decision boundaries: alternatives, explicit design-rule checks, regression triage, and iteration acceptance. Skip trivial edits and tasks better settled by tests or direct reasoning.\n- Codex remains responsible for implementation and final judgment. Supply the current project's rules and concise non-secret text evidence; do not reuse another project's design tokens.\n- Jev is advisory, pinned to 1.13 through OpenRouter, and non-blocking. If unavailable or inconclusive, continue directly. Read the skill before invoking its global runner.\n`);
}
console.log(`Installed Jev skill at ${target}; preserved existing global instructions.`);
