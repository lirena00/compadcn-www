import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  async redirects() {
    const movedPages = {
      'add-components': 'commands/add',
      inventory: 'commands/inventory',
      usage: 'commands/audit',
      cleanup: 'commands/plan',
      collections: 'commands/collection',
      automation: 'commands/check',
    };
    return [
      { source: '/docs/:path*', destination: '/documentation/:path*', permanent: true },
      ...Object.entries(movedPages).map(([from, to]) => ({
        source: `/documentation/${from}`,
        destination: `/documentation/${to}`,
        permanent: true,
      })),
    ];
  },
};

export default withMDX(config);
