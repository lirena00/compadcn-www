import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const root = new URL('../content/docs/', import.meta.url);
const files = [];
async function scan(path = '') {
  const entries = await readdir(new URL(path, root), { withFileTypes: true });
  const expected = entries.filter((entry) => entry.isDirectory() || entry.name.endsWith('.mdx'));
  const meta = JSON.parse(await readFile(new URL(`${path}meta.json`, root), 'utf8'));
  const ordered = meta.pages.filter((entry) => !entry.startsWith('---'));
  assert.equal(new Set(ordered).size, ordered.length, `${path}: duplicate sidebar page`);
  assert.deepEqual(new Set(ordered), new Set(expected.map((entry) => entry.name.replace(/\.mdx$/, ''))), `${path}: every page and folder must appear exactly once in the sidebar`);
  for (const entry of expected) {
    if (entry.isDirectory()) await scan(`${path}${entry.name}/`);
    else files.push(`${path}${entry.name}`);
  }
}
await scan();
const pages = new Set(files.map((file) => file.replace(/\.mdx$/, '').replace(/(?:^|\/)index$/, '')));
const captures = JSON.parse(await readFile(new URL('../content/terminal/captures.json', import.meta.url), 'utf8'));
const usedCaptures = new Set();

let links = 0;
let commands = 0;
for (const file of files) {
  const content = await readFile(new URL(file, root), 'utf8');
  assert.match(content, /^---\r?\n[\s\S]*?^title: .+$/m, `${file}: missing title`);
  assert.match(content, /^description: .+$/m, `${file}: missing description`);

  for (const [, id] of content.matchAll(/<TerminalOutput id="([^"]+)"\s*\/>/g)) {
    assert(captures.entries[id], `${file}: missing terminal capture ${id}`);
    usedCaptures.add(id);
  }

  for (const [, language, code] of content.matchAll(/```(npm|bash|powershell)[^\n]*\n([\s\S]*?)\n```/g)) {
    if (language === 'npm') {
      assert.match(code, /^npx shadcn-plus@(?:latest|\d+\.\d+\.\d+)(?:\s|$)/m, `${file}: runner tabs need a versioned npx example`);
      commands++;
    } else {
      assert.doesNotMatch(code, /^shadcn-plus(?:\s|$)/m, `${file}: use an npm fence for CLI runner tabs`);
    }
  }

  for (const match of content.matchAll(/(?:href=["']|\]\()\/documentation(?:\/([^\s"')#]+))?/g)) {
    const target = (match[1] || '').replace(/\/index$/, '');
    assert(pages.has(target), `${file}: missing linked page ${target}`);
    links++;
  }
}

assert.deepEqual(usedCaptures, new Set(Object.keys(captures.entries)), 'Every capture must be attached to a command page');
for (const [id, entry] of Object.entries(captures.entries)) {
  assert.match(entry.image, /^\/images\/terminal\/[a-z-]+\.png$/, `${id}: invalid image path`);
  assert(entry.output && entry.command.startsWith('shadcn-plus '), `${id}: missing accessible transcript`);
  const bytes = await readFile(new URL(`../public${entry.image}`, import.meta.url));
  assert.equal(bytes.subarray(1, 4).toString(), 'PNG', `${id}: invalid PNG`);
  assert.equal(bytes.toString('ascii', 12, 16), 'IHDR', `${id}: missing PNG header`);
  assert(bytes.includes(Buffer.from('impeccable:prompt\0Source: real shadcn-plus ')), `${id}: missing embedded capture origin`);
  assert.equal(bytes.readUInt32BE(16), entry.width, `${id}: incorrect image width`);
  assert.equal(bytes.readUInt32BE(20), entry.height, `${id}: incorrect image height`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), entry.sha256, `${id}: capture metadata does not match image`);
}

console.log(`Checked ${files.length} pages, sidebar entries, ${links} internal links, ${commands} package-runner examples, and ${usedCaptures.size} terminal captures with transcripts and matching image checksums.`);
