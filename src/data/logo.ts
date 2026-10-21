// Logo do CEFON redesenhado em vetor a partir da imagem enviada pela clínica.
// Quando o manual da marca chegar com os vetores oficiais, troque os desenhos abaixo
// e rode `npm run assets` para regerar favicon, ícones e imagem de compartilhamento.

export const MARK_VIEWBOX = '80 176 158 158';
export const FULL_VIEWBOX = '80 176 393 158';

/** Cor original do texto "cefon" no logo. */
export const WORDMARK_COLOR = '#505559';

/** Círculos sobrepostos do símbolo. */
export const markSvg = [
  '<circle cx="122.5" cy="276" r="40" fill="#90ccf0" fill-opacity=".9"/>',
  '<circle cx="132.5" cy="228.5" r="40" fill="#009036" fill-opacity=".85"/>',
  '<circle cx="125" cy="232" r="36" fill="#3aa935" fill-opacity=".55"/>',
  '<circle cx="192.5" cy="221" r="42.5" fill="#e8e040" fill-opacity=".75"/>',
  '<circle cx="178.75" cy="229.75" r="41.25" fill="#fce400" fill-opacity=".85"/>',
  '<circle cx="133.75" cy="264.5" r="41" fill="#24b4e4" fill-opacity=".8"/>',
  '<circle cx="175" cy="286" r="45" fill="#f0a890" fill-opacity=".8"/>',
  '<circle cx="191" cy="276" r="39" fill="#e45430" fill-opacity=".8"/>',
  '<circle cx="196" cy="268" r="34" fill="#c8401e" fill-opacity=".35"/>',
].join('');

/** Texto "cefon" desenhado em traço, para herdar a cor do contexto. */
export const wordmarkSvg = (color = 'currentColor', strokeWidth = 3.4) =>
  `<g transform="translate(248 201)" fill="none" stroke="${color}" stroke-width="${strokeWidth}">` +
  '<path d="M38.7 31.7H25a23.3 23.3 0 0 0 0 46.6h13.7"/>' +
  '<path d="M47 55h40a16.7 23.3 0 0 0-16.7-23.3a23.3 23.3 0 0 0 0 46.6h13.4"/>' +
  '<path d="M100.3 107V14.7a13 13 0 0 1 13-13c7 0 13 1.2 17 3.6"/>' +
  '<path d="M95.3 31.7H117"/>' +
  '<circle cx="146.2" cy="55" r="23.3"/>' +
  '<path d="M183.7 80V30M183.7 50a18.3 18.3 0 0 1 36.6 0v30"/>' +
  '</g>';
