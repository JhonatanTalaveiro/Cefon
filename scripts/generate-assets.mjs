// Gera favicon, ícone do iPhone, logo para o Google e imagem de compartilhamento
// a partir do logo em src/data/logo.ts. Rode com: npm run assets
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { FULL_VIEWBOX, MARK_VIEWBOX, WORDMARK_COLOR, markSvg, wordmarkSvg } from '../src/data/logo.ts';

const PAPER = '#fbfaf7';
const fullLogo = markSvg + wordmarkSvg(WORDMARK_COLOR);
const out = (file) => new URL(`../public/${file}`, import.meta.url);
const svg = (attrs, inner) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" ${attrs}>${inner}</svg>`);
const png = (buffer) => sharp(buffer).png({ compressionLevel: 9 }).toBuffer();

// favicon.svg
await writeFile(out('favicon.svg'), svg(`viewBox="${MARK_VIEWBOX}"`, markSvg));

// favicon.ico (PNG 32×32 dentro de um contêiner ICO)
const ico32 = await png(svg(`viewBox="${MARK_VIEWBOX}" width="32" height="32"`, markSvg));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(ico32.length, 8);
entry.writeUInt32LE(header.length + entry.length, 12);
await writeFile(out('favicon.ico'), Buffer.concat([header, entry, ico32]));

// apple-touch-icon.png (180×180, fundo branco com respiro)
await writeFile(
  out('apple-touch-icon.png'),
  await png(svg('viewBox="58 154 202 202" width="180" height="180"', `<rect x="58" y="154" width="202" height="202" fill="#fff"/>${markSvg}`)),
);

// logo.png (512×512) para os dados estruturados
await writeFile(
  out('logo.png'),
  await png(
    svg(
      'viewBox="0 0 512 512" width="512" height="512"',
      `<rect width="512" height="512" fill="#fff"/><svg x="36" y="164" width="440" height="184" viewBox="${FULL_VIEWBOX}">${fullLogo}</svg>`,
    ),
  ),
);

// og-image.png (1200×630) para WhatsApp, Facebook etc.
const circles = [
  { cx: 1130, cy: 40, r: 190, fill: '#fce400', o: 0.35 },
  { cx: 1040, cy: 610, r: 170, fill: '#90ccf0', o: 0.45 },
  { cx: 60, cy: 590, r: 150, fill: '#f0a890', o: 0.4 },
  { cx: 90, cy: 20, r: 110, fill: '#3aa935', o: 0.18 },
]
  .map((c) => `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" fill="${c.fill}" fill-opacity="${c.o}"/>`)
  .join('');
await writeFile(
  out('og-image.png'),
  await png(
    svg(
      'viewBox="0 0 1200 630" width="1200" height="630"',
      `<rect width="1200" height="630" fill="${PAPER}"/>${circles}<svg x="250" y="185" width="700" height="260" viewBox="${FULL_VIEWBOX}">${fullLogo}</svg>`,
    ),
  ),
);

console.log('Arquivos gerados em public/');
