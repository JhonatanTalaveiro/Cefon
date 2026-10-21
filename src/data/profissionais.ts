import type { ImageMetadata } from 'astro';

// PENDENTE: nome, CRFa, área de atuação e foto de cada profissional.
// Para usar foto: salve em src/assets/profissionais/ e importe aqui, por exemplo:
//   import fotoAna from '../assets/profissionais/ana.jpg';
//   { ..., foto: fotoAna }
// Sem foto, o card mostra as iniciais.

export type Profissional = {
  nome: string;
  crfa: string;
  cargo: string;
  areas: string[];
  foto?: ImageMetadata;
  responsavelTecnica?: boolean;
};

export const profissionais: Profissional[] = [
  {
    nome: 'Nome da Profissional',
    crfa: 'CRFa 2-XXXXX',
    cargo: 'Fonoaudióloga',
    areas: ['Audiologia', 'Exames auditivos'],
    responsavelTecnica: true,
  },
  {
    nome: 'Nome da Profissional',
    crfa: 'CRFa 2-XXXXX',
    cargo: 'Fonoaudióloga',
    areas: ['Linguagem infantil', 'Leitura e escrita'],
  },
  {
    nome: 'Nome da Profissional',
    crfa: 'CRFa 2-XXXXX',
    cargo: 'Fonoaudióloga',
    areas: ['Voz', 'Motricidade orofacial'],
  },
];
