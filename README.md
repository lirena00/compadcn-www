# shadcn-plus website

The existing landing page and v2 documentation for [shadcn-plus](https://github.com/lirena00/compadcn). Documentation uses Next.js, Fumadocs UI, and Fumadocs MDX.

## Develop

Requires Node.js 22.12+ and pnpm 10.13.1.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `/documentation`. `/docs` and its subpaths redirect to the same documentation.

## Edit documentation

- Write pages in `content/docs/`. Each CLI command and actionable subcommand has its own page under `commands/`.
- Set a title and a one-sentence description in frontmatter.
- Add each page or folder to its directory's `meta.json` for sidebar ordering.
- Keep examples consistent with the CLI implementation. Distinguish source builds from published packages until v2 ships.

Use the [Fumadocs components](https://www.fumadocs.dev/docs/ui/components) registered in `src/components/mdx.tsx`: Steps for sequences, Tabs for alternatives, Callouts for caveats, Accordions for troubleshooting, Files for directory structure, and Cards for navigation. Code blocks get highlighting and copy controls automatically. Use ordinary tables for command and option references.

Write executable CLI examples in an `npm` code fence, starting with `npx shadcn-plus@latest`. Fumadocs generates npm, pnpm, Yarn, and Bun tabs with synchronized, persistent selection. Use an exact CLI version in CI examples. Keep source-build setup in ordinary shell fences.

The source adapter is `src/lib/source.ts`; `/api/search` indexes its pages. The documentation layout loads its provider and styles. `.source` is generated and must not be committed.

## Validate

```bash
pnpm check:docs
pnpm typecheck
pnpm build
```

The content check validates sidebar coverage, page metadata, and internal documentation links. Review desktop/mobile navigation, search, tabs, accordions, code copying, and both themes when changing the interface.
