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

## Terminal output images

Command pages use real captured output, rendered by [Charm Freeze](https://github.com/charmbracelet/freeze) and rasterized at 3× with `@resvg/resvg-js`. Fumadocs ImageZoom handles enlargement; each image has a complete accessible text transcript.

Install Freeze **0.2.2** from its official releases, build the sibling CLI, then run:

```bash
pnpm docs:screenshots
```

Set `FREEZE_BIN` when Freeze is outside PATH and `SHADCN_PLUS_CLI` when the built CLI is not at `../compadcn/dist/cli.js`. The generator creates an isolated temporary React/Vite project, installs its dependencies, and runs real commands against the live Blobz registry. It never invokes the unrelated public `shadcn-plus` npm package or mutates a user's application. The temporary project and raw output remain available for inspection.

The fixture exposes only the real official Button manifest through an explicitly constrained local catalog. This avoids claiming coverage of incompatible targets elsewhere in the full official catalog. Real Blobz files are seeded from their manifests; add/collection-install screenshots show already-present files being skipped, because the current upstream installer rejects built-in namespace overrides. Capture assertions require complete analysis, reviewed cleanup, a real Vite build, and successful recovery before assets are accepted.

`content/terminal/captures.json` records commands, complete normalized output, exit codes, tool/renderer versions, manifest provenance, image dimensions, and checksums. Images live in `public/images/terminal/` and embed their capture origin. Absolute demo paths are shortened; counts and generated IDs are not invented. Long reports have clearly labeled image excerpts and complete transcripts. Regeneration requires registry/network availability and may differ when upstream manifests change.

## Validate

```bash
pnpm check:docs
pnpm typecheck
pnpm build
```

The content check validates sidebar coverage, page metadata, and internal documentation links. Review desktop/mobile navigation, search, tabs, accordions, code copying, and both themes when changing the interface.
