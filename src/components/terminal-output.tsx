import Link from 'next/link';
import Image from 'next/image';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import captures from '../../content/terminal/captures.json';

type Capture = {
  image: string;
  width: number;
  height: number;
  command: string;
  output: string;
  exitCode: number;
  description: string;
  excerpt: boolean;
};

export function TerminalOutput({ id }: { id: string }) {
  const entry = (captures.entries as Record<string, Capture>)[id];
  if (!entry) throw new Error(`Unknown terminal capture: ${id}`);

  return (
    <section className="terminal-output" aria-label="Example terminal output">
      <figure>
        <ImageZoom
          src={entry.image}
          alt={entry.description}
          width={entry.width}
          height={entry.height}
        >
          <Image src={entry.image} alt={entry.description} width={entry.width} height={entry.height} unoptimized />
        </ImageZoom>
        <figcaption>
          <Link href="/documentation/example-project">Dashboard demo</Link>
          {' · '}shadcn-plus {captures.toolVersion}
          {' · '}{entry.excerpt ? 'Output excerpt' : 'Plain output'}
          {entry.exitCode !== 0 && ` · Exit ${entry.exitCode}`}
        </figcaption>
      </figure>
      <Accordions type="single">
        <Accordion title="Read text output">
          <p>{entry.description}</p>
          <pre tabIndex={0} aria-label={`Full output of ${entry.command}`}><code>{`$ ${entry.command}\n\n${entry.output}\n`}</code></pre>
        </Accordion>
      </Accordions>
    </section>
  );
}
