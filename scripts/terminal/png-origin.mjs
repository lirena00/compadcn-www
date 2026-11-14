import { Buffer } from 'node:buffer';

// Preserve the rendered pixels while recording the capture's origin in PNG text metadata.
export function withOrigin(png, origin) {
  const data = Buffer.from(`impeccable:prompt\0${origin}`, 'utf8');
  const chunk = Buffer.alloc(data.length + 12);
  chunk.writeUInt32BE(data.length);
  chunk.write('tEXt', 4);
  data.copy(chunk, 8);
  let crc = 0xffffffff;
  for (const byte of chunk.subarray(4, -4)) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  chunk.writeUInt32BE((crc ^ 0xffffffff) >>> 0, chunk.length - 4);
  const chunks = [png.subarray(0, 8)];
  for (let offset = 8; offset < png.length;) {
    const length = png.readUInt32BE(offset);
    const end = offset + length + 12;
    const previousOrigin = png.toString('ascii', offset + 4, offset + 8) === 'tEXt'
      && png.toString('utf8', offset + 8, offset + 8 + length).startsWith('impeccable:prompt\0');
    if (!previousOrigin) chunks.push(png.subarray(offset, end));
    if (png.toString('ascii', offset + 4, offset + 8) === 'IHDR') chunks.push(chunk);
    offset = end;
  }
  return Buffer.concat(chunks);
}

export function captureOrigin({ version, sourceCommit, command }) {
  return `Source: real shadcn-plus ${version} CLI output from https://github.com/lirena00/compadcn${sourceCommit ? ` at ${sourceCommit}` : ''}. Command: ${command}. Rendered by Charm Freeze 0.2.2 and @resvg/resvg-js 2.6.2 at 3x. Complete transcript, registry manifest sources and normalization: content/terminal/captures.json.`;
}
