import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({ dir: 'content/docs' });

export default defineConfig({
  mdxOptions: {
    remarkNpmOptions: {
      persist: { id: 'package-manager' },
      packageManagers: [
        { name: 'npm', command: (code) => code },
        { name: 'pnpm', command: (code) => code.replace(/^npx /gm, 'pnpm dlx ') },
        { name: 'yarn', command: (code) => code.replace(/^npx /gm, 'yarn dlx ') },
        { name: 'bun', command: (code) => code.replace(/^npx /gm, 'bunx ') },
      ],
    },
  },
});
