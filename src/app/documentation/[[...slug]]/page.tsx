import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { getMDXComponents } from '@/components/mdx';
import { source } from '@/lib/source';

type Props = { params: Promise<{ slug?: string[] }> };

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const Content = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <Content components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const title = `${page.data.title} | shadcn-plus`;
  const description = page.data.description;

  return {
    title,
    description,
    alternates: { canonical: `https://compadcn.lirena.in${page.url}` },
    openGraph: { title, description, url: `https://compadcn.lirena.in${page.url}`, siteName: 'shadcn-plus', images: [] },
    twitter: { title, description, card: 'summary', images: [] },
  };
}
