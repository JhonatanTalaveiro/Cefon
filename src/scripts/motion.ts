// Animações com GSAP. Todas são desligadas para quem pede "reduzir movimento" no aparelho.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Distância do centro de um elemento até o centro do quadro onde ele está posicionado
function distanciaDoCentro(el: HTMLElement) {
  const quadro = el.offsetParent as HTMLElement;
  return {
    x: el.offsetLeft + el.offsetWidth / 2 - quadro.offsetWidth / 2,
    y: el.offsetTop + el.offsetHeight / 2 - quadro.offsetHeight / 2,
  };
}

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  // Medido antes de qualquer animação mexer no layout: só anima o que ainda
  // está abaixo da tela, para nada piscar no carregamento.
  const abaixoDaTela = (seletor: string) =>
    gsap.utils.toArray<HTMLElement>(seletor).filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  const reveals = abaixoDaTela('[data-reveal]');
  const grifos = abaixoDaTela('[data-grifo]');
  const servicos = abaixoDaTela('[data-servico]');

  // Início: os círculos do logo entram e seguem "respirando" devagar
  const blobs = gsap.utils.toArray<HTMLElement>('[data-blob]');
  gsap.fromTo(
    blobs,
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out', stagger: 0.07 },
  );
  blobs.forEach((blob) => {
    gsap.to(blob, {
      xPercent: gsap.utils.random(-7, 7),
      yPercent: gsap.utils.random(-7, 7),
      duration: gsap.utils.random(4, 7),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.2,
    });
  });

  gsap.fromTo(
    '[data-chip]',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.5 },
  );
  gsap.to('[data-chip-inner]', {
    y: -8,
    duration: 2.6,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    stagger: 0.45,
    delay: 1.5,
  });

  gsap.fromTo(
    '.marker:not([data-grifo])',
    { backgroundSize: '0% 0.32em' },
    { backgroundSize: '100% 0.32em', duration: 0.9, ease: 'power2.inOut', delay: 0.35 },
  );

  // Ao rolar para fora do início: a arte encolhe e fica para trás, os círculos se
  // afastam do centro e as etiquetas sobem mais rápido, como se estivessem mais perto.
  // Usa x/y e yPercent, que as animações de entrada e de "respirar" não usam.
  const profundidade = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
  });
  profundidade.to('[data-hero-arte]', { scale: 0.92, y: 70 }, 0);
  blobs.forEach((blob) => {
    profundidade.to(blob, { x: () => distanciaDoCentro(blob).x * 0.35, y: () => distanciaDoCentro(blob).y * 0.35 }, 0);
  });
  const velocidades = [-120, -200, -90, -160];
  gsap.utils.toArray<HTMLElement>('[data-chip]').forEach((chip, i) => {
    profundidade.to(chip, { yPercent: velocidades[i % velocidades.length] }, 0);
  });

  // Seções: entram ao rolar
  gsap.set(reveals, { opacity: 0, y: 32 });
  ScrollTrigger.batch(reveals, {
    start: 'top 92%',
    once: true,
    onEnter: (lote) =>
      gsap.to(lote, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });

  // Títulos: o grifo amarelo vai se pintando conforme o título sobe na tela
  grifos.forEach((grifo) => {
    gsap.fromTo(
      grifo,
      { backgroundSize: '0% 0.32em' },
      {
        backgroundSize: '100% 0.32em',
        ease: 'none',
        scrollTrigger: { trigger: grifo, start: 'top 85%', end: 'top 55%', scrub: 0.6 },
      },
    );
  });

  // Serviços: em cada item, a linha de cima se desenha e o ícone cresce, acompanhando a rolagem
  servicos.forEach((item) => {
    gsap
      .timeline({ scrollTrigger: { trigger: item, start: 'top 92%', end: 'top 65%', scrub: 0.6 } })
      .fromTo(item.querySelector('[data-linha]'), { scaleX: 0 }, { scaleX: 1, ease: 'power2.out' }, 0)
      .fromTo(item.querySelector('.icon-bubble'), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, ease: 'back.out(2)' }, 0.15);
  });

  // Paralaxe leve nos círculos de fundo
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      yPercent: Number(el.dataset.parallax) || -20,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
});

// Só no computador, onde os círculos da faixa escura aparecem
gsap.matchMedia().add('(prefers-reduced-motion: no-preference) and (min-width: 64rem)', () => {
  // Faixa "Não sabe por onde começar?": os três círculos começam afastados e se juntam como no logo
  const grupo = document.querySelector<HTMLElement>('[data-juntar]');
  if (!grupo) return;
  const circulos = Array.from(grupo.children) as HTMLElement[];
  gsap.fromTo(
    circulos,
    {
      x: (_, el: HTMLElement) => distanciaDoCentro(el).x * 1.5,
      y: (_, el: HTMLElement) => distanciaDoCentro(el).y * 1.5,
      scale: 0.6,
      opacity: 0,
    },
    {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: grupo.parentElement, start: 'top 90%', end: 'center 55%', scrub: 0.6, invalidateOnRefresh: true },
    },
  );
});
