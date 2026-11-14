import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const json = (value) => `${JSON.stringify(value, null, 2)}\n`;

async function registryItem(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Registry request failed (${response.status}): ${url}`);
  const bytes = await response.text();
  return { item: JSON.parse(bytes), provenance: { url, sha256: createHash('sha256').update(bytes).digest('hex') } };
}

function dependency(spec) {
  const split = spec.lastIndexOf('@');
  return split > 0 ? [spec.slice(0, split), spec.slice(split + 1)] : [spec, 'latest'];
}

export async function createDemoProject() {
  const workspace = await mkdtemp(join(tmpdir(), 'shadcn-plus-docs-'));
  const root = join(workspace, 'dashboard');
  const button = await registryItem('https://ui.shadcn.com/r/styles/new-york-v4/button.json');
  const avatar = await registryItem('https://blobz.lirena.in/r/avatar.json');
  const chip = await registryItem('https://blobz.lirena.in/r/avatar-chip.json');
  const profile = await registryItem('https://blobz.lirena.in/r/avatar-profile.json');
  // The full live shadcn catalog also contains examples/blocks outside this
  // fixture's destination policy. Expose an explicit one-item demo catalog;
  // preserve the real Button manifest bytes and keep Blobz on its live URL.
  const catalog = createServer((request, response) => {
    const name = new URL(request.url, 'http://demo').pathname;
    const value = name === '/registry.json'
      ? { name: 'dashboard-official-button', homepage: 'https://ui.shadcn.com', items: [button.item] }
      : name === '/button.json' ? button.item : undefined;
    response.writeHead(value ? 200 : 404, { 'content-type': 'application/json' });
    response.end(json(value ?? { error: 'Not in the explicit demo catalog' }));
  });
  await new Promise((done) => catalog.listen(0, '127.0.0.1', done));
  catalog.unref();
  const officialTemplate = `http://127.0.0.1:${catalog.address().port}/{name}.json`;
  const dependencies = {
    react: '19.3.1',
    'react-dom': '19.3.1',
    clsx: '2.1.1',
    'tailwind-merge': '3.3.1',
    ...Object.fromEntries([button, avatar, chip, profile].flatMap(({ item }) => item.dependencies ?? []).map(dependency)),
  };
  const files = {
    '.git': '',
    'package.json': json({
      name: 'dashboard-demo', private: true, version: '1.0.0', type: 'module', packageManager: 'pnpm@10.13.1',
      scripts: { build: 'vite build' }, dependencies,
      devDependencies: { vite: '7.3.8', typescript: '5.8.3', tailwindcss: '4.3.5', '@tailwindcss/postcss': '4.3.5' },
    }),
    'components.json': json({
      $schema: 'https://ui.shadcn.com/schema.json', style: 'new-york', rsc: false, tsx: true,
      tailwind: { config: '', css: 'src/styles.css', baseColor: 'neutral', cssVariables: true },
      aliases: { components: '@/components', ui: '@/components/ui', utils: '@/lib/utils', lib: '@/lib', hooks: '@/hooks' },
      registries: { '@shadcn': officialTemplate, '@blobz': 'https://blobz.lirena.in/r/{name}.json' },
    }),
    'tsconfig.json': json({ compilerOptions: { target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', baseUrl: '.', paths: { '@/*': ['./src/*'] }, skipLibCheck: true }, include: ['src'] }),
    'index.html': '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Dashboard demo</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n',
    'postcss.config.mjs': 'export default { plugins: { "@tailwindcss/postcss": {} } };\n',
    'vite.config.mjs': 'import { fileURLToPath } from "node:url";\nexport default { resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } } };\n',
    'src/styles.css': '@import "tailwindcss";\n:root { --background: white; --foreground: #171717; }\n',
    'src/lib/utils.ts': 'import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\nexport function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }\n',
    'src/main.tsx': 'import { createRoot } from "react-dom/client";\nimport { Button } from "@/components/ui/button";\nimport { Avatar, AvatarFallback } from "@/components/ui/avatar";\nimport "./styles.css";\n\ncreateRoot(document.getElementById("root")!).render(\n  <main><h1>Team dashboard</h1><Avatar><AvatarFallback name="Asha" /></Avatar><Button>Invite teammate</Button></main>\n);\n',
    '.shadcn-plus/legacy-presets.json': json({ presets: { dashboard: { label: 'Dashboard', description: 'Shared team controls', components: [{ value: 'button' }, { value: 'avatar' }], dependencies: [] } } }),
  };
  for (const capture of [button, avatar, chip, profile]) {
    for (const file of capture.item.files ?? []) {
      if (!['registry:ui', 'registry:component'].includes(file.type) || typeof file.content !== 'string') throw new Error('Unexpected bootstrap registry file');
      const name = file.target?.replace(/^@ui\//, 'src/components/ui/').replace(/^@components\//, 'src/components/') ?? `src/components/ui/${file.path.split('/').at(-1)}`;
      if (!name || name.includes('..') || name.startsWith('/')) throw new Error('Unsafe bootstrap destination');
      files[name] = `${file.content.trimEnd()}\n`;
    }
  }
  for (const [path, content] of Object.entries(files)) {
    const target = join(root, path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, content);
  }
  return { workspace, root, provenance: [button, avatar, chip, profile].map(({ provenance }) => provenance), close: () => { catalog.closeAllConnections(); catalog.close(); } };
}
