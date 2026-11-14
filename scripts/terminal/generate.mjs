import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { createDemoProject } from './demo-project.mjs';
import { captureOrigin, withOrigin } from './png-origin.mjs';

const repository = fileURLToPath(new URL('../../', import.meta.url));
const cli = resolve(process.env.SHADCN_PLUS_CLI ?? join(repository, '../compadcn/dist/cli.js'));
const freeze = process.env.FREEZE_BIN ?? 'freeze';
const outputDirectory = join(repository, 'public/images/terminal');
const dataDirectory = join(repository, 'content/terminal');
const config = fileURLToPath(new URL('./freeze.json', import.meta.url));
const env = { ...process.env, NO_COLOR: '1', CI: '1' };
delete env.FORCE_COLOR;

function execute(command, args, cwd, input) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { cwd, env, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'], shell: false });
    let stdout = '', stderr = '';
    child.stdout.on('data', (data) => { stdout += data; });
    child.stderr.on('data', (data) => { stderr += data; });
    child.on('error', reject);
    child.on('close', (code) => resolvePromise({ code, stdout, stderr }));
    child.stdin.end(input);
  });
}

const version = await execute(freeze, ['--version'], repository);
assert(version.code === 0 && version.stdout.includes('0.2.2'), 'Install Freeze 0.2.2 and set FREEZE_BIN to its executable');
const packageJson = JSON.parse(await readFile(join(dirname(cli), '../package.json'), 'utf8'));
assert.equal(packageJson.name, 'shadcn-plus', 'SHADCN_PLUS_CLI must point to this project, not the unrelated npm package');
assert(packageJson.repository?.url?.includes('lirena00/compadcn'), 'The CLI must come from the lirena00/compadcn repository');
const cliRoot = resolve(dirname(cli), '..');
const sourceHead = existsSync(join(cliRoot, '.git')) ? await execute('git', ['rev-parse', 'HEAD'], cliRoot) : undefined;
const sourceCommit = sourceHead?.code === 0 ? sourceHead.stdout.trim() : packageJson.gitHead;
const demo = await createDemoProject();
console.log(`Demo workspace: ${demo.root}`);
const pnpmScript = process.env.npm_execpath;
assert(pnpmScript, 'Run this generator with pnpm docs:screenshots');
const installed = await execute(process.execPath, [pnpmScript, 'install', '--ignore-scripts'], demo.root);
assert(installed.code === 0, `Demo dependency install failed:\n${installed.stderr}\n${installed.stdout}`);
const build = await execute(process.execPath, [pnpmScript, 'run', 'build'], demo.root);
assert(build.code === 0, `Initial Vite build failed:\n${build.stderr}\n${build.stdout}`);

await mkdir(outputDirectory, { recursive: true });
await mkdir(dataDirectory, { recursive: true });
const stagedImages = join(demo.workspace, 'images');
await mkdir(stagedImages);
const entries = {};
const normalize = (text) => text.replaceAll(demo.root, '/projects/dashboard').replaceAll(demo.root.replaceAll('\\', '/'), '/projects/dashboard').replaceAll(demo.workspace, '/projects').replaceAll('\\', '/').replace(/\r\n/g, '\n').trimEnd();

async function capture(id, args, { registry = true, exitCode = 0, expect, description, lines = 20 } = {}) {
  const entry = ['audit', 'why', 'check', 'remove'].includes(args[0]) || (args[0] === 'plan' && args[1] !== 'check');
  const actualArgs = [...args, ...(entry ? ['--entry', 'src/main.tsx'] : []), ...(registry ? ['--cache-dir', '.shadcn-plus/cache'] : [])];
  const result = await execute(process.execPath, [cli, ...actualArgs], demo.root);
  await writeFile(join(demo.workspace, `${id}.raw.txt`), `${result.stdout}${result.stderr}`);
  assert.equal(result.code, exitCode, `${id} exited ${result.code}; full output is in ${demo.workspace}:\n${result.stdout.slice(0, 4000)}\n${result.stderr.slice(0, 4000)}`);
  const output = normalize(result.stdout + result.stderr);
  if (expect) assert.match(output, expect, `${id}: unexpected output`);
  const command = `shadcn-plus ${actualArgs.join(' ')}`;
  const outputLines = output.split('\n');
  const excerpt = outputLines.slice(0, lines).join('\n');
  const terminal = `\u001b[38;2;134;239;172m$\u001b[0m ${command}\n\n${excerpt}\n`;
  const rendered = await execute(freeze, ['--language', 'ansi', '--config', config, '--wrap', '88', '--output', join(demo.workspace, `${id}.svg`)], repository, terminal);
  assert.equal(rendered.code, 0, `Freeze failed: ${rendered.stderr}`);
  const svg = await readFile(join(demo.workspace, `${id}.svg`), 'utf8');
  const font = svg.match(/data:application\/x-font-woff2;charset=utf-8;base64,([^)]*)/);
  assert(font, 'Freeze must embed JetBrains Mono for portable rendering');
  const fontPath = join(demo.workspace, 'JetBrainsMono-Regular.ttf');
  await writeFile(fontPath, Buffer.from(font[1], 'base64'));
  const image = new Resvg(svg, { fitTo: { mode: 'zoom', value: 3 }, font: { fontFiles: [fontPath], loadSystemFonts: false, defaultFontFamily: 'JetBrains Mono' } }).render();
  const bytes = withOrigin(image.asPng(), captureOrigin({ version: packageJson.version, sourceCommit, command }));
  await writeFile(join(stagedImages, `${id}.png`), bytes);
  entries[id] = {
    image: `/images/terminal/${id}.png`, width: image.width, height: image.height,
    command, output, exitCode, description, excerpt: outputLines.length > lines,
    sha256: createHash('sha256').update(bytes).digest('hex'),
  };
  console.log(`Captured ${id} (${image.width}×${image.height}, exit ${exitCode})`);
  return result;
}

await capture('doctor', ['doctor'], { registry: false, expect: /Discovery complete/, description: 'The dashboard project resolves as Vite with configured UI aliases.' });
await capture('search', ['search', 'avatar', '--registry', '@blobz', '--limit', '6'], { expect: /@blobz\/avatar/, description: 'Search the real Blobz catalog for avatar components.' });
await capture('inventory', ['inventory'], { expect: /Inventory complete/, description: 'Official and Blobz catalog entries stay separate from observed local files.' });
await capture('audit', ['audit'], { expect: /Audit complete/, description: 'The dashboard imports the official Button and Blobz Avatar.' });
await capture('why', ['why', '@blobz/avatar'], { expect: /Usage: runtime/, description: 'Trace why the dashboard retains the Blobz Avatar.' });
await capture('graph', ['graph', '--focus', '@blobz/avatar', '--reverse', '--transitive'], { expect: /Graph complete/, description: 'Follow reverse dependencies from the custom-registry Avatar.' });
await capture('add', ['add', '@blobz/avatar-chip', '--yes'], { expect: /Skipped @blobz\/avatar-chip/, description: 'An already-present Blobz Avatar Chip is detected and skipped without overwriting it.' });
await capture('collection-create', ['collection', 'create', 'collections/team.json', 'button', '@blobz/avatar-profile', '--name', 'Team'], { registry: false, expect: /Created Team/, description: 'Create a selection containing official and Blobz components.' });
await capture('collection-show', ['collection', 'show', 'collections/team.json'], { registry: false, expect: /@blobz\/avatar-profile/, description: 'Read the saved qualified component selection.' });
await capture('collection-list', ['collection', 'list', 'collections'], { registry: false, expect: /1 files/, description: 'List the demo collection directory.' });
await capture('collection-install', ['collection', 'install', 'collections/team.json', '--yes'], { expect: /Skipped @blobz\/avatar-profile/, description: 'A collection recognizes already-present official and Blobz files and skips replacements.' });
await capture('collection-migrate', ['collection', 'migrate', '--from', '.shadcn-plus/legacy-presets.json', '--map', 'button=@shadcn/button', '--map', 'avatar=@blobz/avatar'], { expect: /Legacy migration: preview/, description: 'Preview a legacy preset mapped to official and Blobz addresses.' });
await capture('agent-skill', ['agent', 'skill', '--out', '.agents/skills/shadcn-plus'], { registry: false, expect: /SKILL.md/, description: 'Install the bundled skill into an explicit demo directory.' });
await capture('check', ['check', '--limit', '4'], { exitCode: 1, expect: /CHECK_FAILED/, description: 'CI reports unused Blobz compositions as policy findings.' });
await capture('check-baseline', ['check', 'baseline', '--out', '.shadcn-plus/check-baseline.json'], { expect: /Recorded/, description: 'Capture current findings for review without fixing or hiding them.' });
await capture('plan-snapshot', ['plan', 'snapshot', '--out', '.shadcn-plus/ownership.json'], { expect: /Observed mappings/, description: 'Propose observed ownership for explicit review.' });
await capture('plan-prune', ['plan', 'prune', '--ownership', '.shadcn-plus/ownership.json', '--verify-script', 'build', '--out', '.shadcn-plus/plans/cleanup.json', '--summary'], { expect: /Status: ready/, description: 'Plan unused component deletions while retaining the live Avatar and Button.' });
await capture('plan-remove', ['plan', 'remove', '@blobz/avatar-chip', '--ownership', '.shadcn-plus/ownership.json', '--out', '.shadcn-plus/plans/chip.json', '--summary'], { expect: /Status: ready/, description: 'Preview removal of one named, unused Blobz component.' });
await capture('remove', ['remove', '@blobz/avatar-chip', '--ownership', '.shadcn-plus/ownership.json', '--out', '.shadcn-plus/plans/alias.json', '--summary'], { expect: /Status: ready/, description: 'The compatibility command produces a plan rather than deleting files.' });
await capture('plan-check', ['plan', 'check', '.shadcn-plus/plans/cleanup.json'], { expect: /Valid: true; ready: true/, description: 'Revalidate the reviewed cleanup artifact.' });
await capture('apply', ['apply', '--plan', '.shadcn-plus/plans/cleanup.json', '--precheck', '--yes'], { expect: /completed/, description: 'Back up unused components, delete the planned files, and run the real Vite build.' });
const operations = await import('node:fs/promises').then((fs) => fs.readdir(join(demo.root, '.shadcn-plus/operations')));
assert.equal(operations.length, 1, 'Expected one cleanup operation');
await capture('operation', ['operation', operations[0]], { registry: false, expect: /completed/, description: 'Inspect the recorded deletions and build verification.' });
await capture('restore', ['restore', operations[0], '--yes'], { registry: false, expect: /restored|recovered/, description: 'Recover the original component files from the operation backup.' });

const plan = JSON.parse(await readFile(join(demo.root, '.shadcn-plus/plans/cleanup.json'), 'utf8'));
assert(plan.operations.length > 0, 'The cleanup demonstration must delete real files');
for (const operation of plan.operations) {
  const restored = await readFile(join(demo.root, operation.path));
  assert.equal(createHash('sha256').update(restored).digest('hex'), operation.before.sha256, `Restore changed ${operation.path}`);
}
for (const id of Object.keys(entries)) await copyFile(join(stagedImages, `${id}.png`), join(outputDirectory, `${id}.png`));

await writeFile(join(dataDirectory, 'captures.json'), `${JSON.stringify({
  schemaVersion: 1, toolVersion: packageJson.version, capturedAt: new Date().toISOString(),
  ...(sourceCommit ? { sourceCommit } : {}),
  renderer: { name: 'Charm Freeze', version: '0.2.2', rasterizer: '@resvg/resvg-js@2.6.2', scale: 3 },
  project: 'Dashboard React/Vite demo', provenance: demo.provenance,
  normalization: 'Absolute demo paths are replaced with /projects/dashboard; path separators use slashes. Output is otherwise unchanged. Images show at most the first 20 output lines; transcripts are complete.',
  entries,
}, null, 2)}\n`);
demo.close();
console.log(`Saved ${Object.keys(entries).length} captures. Raw outputs and project remain at ${demo.workspace}`);
