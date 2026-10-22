// Comportamentos básicos da interface (funcionam com ou sem animações).

// Cabeçalho ganha sombra ao rolar
const header = document.querySelector<HTMLElement>('[data-header]');
const marcarRolagem = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
marcarRolagem();
window.addEventListener('scroll', marcarRolagem, { passive: true });

// Menu do celular
const botaoMenu = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.getElementById('menu-mobile');

function abrirMenu(aberto: boolean) {
  if (!botaoMenu || !menu) return;
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  menu.dataset.open = String(aberto);
  menu.inert = !aberto;
  document.documentElement.classList.toggle('menu-open', aberto);
}

botaoMenu?.addEventListener('click', () => abrirMenu(botaoMenu.getAttribute('aria-expanded') !== 'true'));
menu?.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).closest('a')) abrirMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && botaoMenu?.getAttribute('aria-expanded') === 'true') {
    abrirMenu(false);
    botaoMenu.focus();
  }
});
window.matchMedia('(min-width: 64rem)').addEventListener('change', (event) => {
  if (event.matches) abrirMenu(false);
});

// Menu do computador: destaca o link da seção que está na tela.
// A seção atual é a que cruza uma linha imaginária a 40% da altura da tela.
const linksMenu = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
const secoes = Array.from(linksMenu, (link) => document.getElementById(link.hash.slice(1))).filter(
  (secao): secao is HTMLElement => secao !== null,
);

let secaoAtual: string | null = null;

function marcarSecao(id: string | null) {
  secaoAtual = id;
  linksMenu.forEach((link) => {
    if (id && link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

if (secoes.length && 'IntersectionObserver' in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          marcarSecao(entrada.target.id);
        } else if (entrada.target.id === secaoAtual && entrada.boundingClientRect.top > (entrada.rootBounds?.top ?? 0)) {
          // A atual saiu por baixo da linha (rolando para cima). Ao voltar para o início,
          // nenhum link fica marcado; já no rodapé, Contato continua marcado.
          marcarSecao(null);
        }
      });
    },
    { rootMargin: '-40% 0px -60% 0px' },
  );
  secoes.forEach((secao) => observador.observe(secao));
}

// Barra fixa do celular: aparece quando os botões do topo saem da tela
const barra = document.querySelector<HTMLElement>('[data-mobile-bar]');
const botoesTopo = document.querySelector('[data-hero-ctas]');

function mostrarBarra(visivel: boolean) {
  if (!barra) return;
  barra.dataset.state = visivel ? 'visible' : 'hidden';
  barra.inert = !visivel;
}

if (botoesTopo && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entrada]) => mostrarBarra(!entrada.isIntersecting)).observe(botoesTopo);
} else {
  mostrarBarra(true);
}
