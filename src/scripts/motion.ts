// Animações com GSAP. Todas são desligadas para quem pede "reduzir movimento" no aparelho.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  // Medido antes de qualquer animação mexer no layout: só anima o que ainda
  // está abaixo da tela, para nada piscar no carregamento.
  const abaixoDaTela = gsap.utils
    .toArray<HTMLElement>('[data-reveal]')
    .filter((el) => el.getBoundingClientRect().top > window.innerHeight);

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
    '.marker',
    { backgroundSize: '0% 0.32em' },
    { backgroundSize: '100% 0.32em', duration: 0.9, ease: 'power2.inOut', delay: 0.35 },
  );

  // Seções: entram ao rolar
  gsap.set(abaixoDaTela, { opacity: 0, y: 32 });
  ScrollTrigger.batch(abaixoDaTela, {
    start: 'top 92%',
    once: true,
    onEnter: (lote) =>
      gsap.to(lote, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true }),
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
