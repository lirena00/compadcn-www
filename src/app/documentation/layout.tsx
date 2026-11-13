import type { ReactNode } from 'react';
import { Geist } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Banner } from 'fumadocs-ui/components/banner';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { source } from '@/lib/source';
import './docs.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-docs-sans' });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`${geist.variable} documentation`}>
      <RootProvider theme={{ defaultTheme: 'light', enableSystem: true }}>
        <Banner height="3.5rem">
          <span>V2 is unpublished. These are future-release commands.{' '}<Link href="/documentation/quick-start" className="underline underline-offset-4">Use the source build.</Link></span>
        </Banner>
        <DocsLayout
          tree={source.getPageTree()}
          nav={{
            title: <span className="docs-brand"><Image src="/icon_transparent.svg" alt="" width={24} height={24} className="dark:invert" />shadcn-plus<span className="docs-version">v2</span></span>,
            url: '/documentation',
          }}
          githubUrl="https://github.com/lirena00/compadcn"
          links={[{ text: 'Website', url: '/' }]}
          sidebar={{
            collapsible: false,
            footer: <Link className="docs-release-note" href="/documentation/quick-start"><span><strong>V2 is in development</strong><span>Start with the source build.</span></span><ArrowUpRight aria-hidden="true" size={16} /></Link>,
          }}
        >
          {children}
        </DocsLayout>
      </RootProvider>
    </div>
  );
}
