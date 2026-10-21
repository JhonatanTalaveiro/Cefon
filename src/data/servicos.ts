import type { IconName } from './icons';

// PENDENTE: lista real de exames e serviços da clínica.
// Os itens abaixo são exemplos comuns em clínicas de fonoaudiologia, só para montar o layout.
// Regras (CFFa): texto informativo, sem preço e sem promessa de resultado ou cura.

export type Servico = {
  nome: string;
  /** Uma frase simples dizendo para que serve. */
  descricao: string;
  icone: IconName;
};

export type GrupoServicos = {
  titulo: string;
  descricao: string;
  itens: Servico[];
};

export const grupos: GrupoServicos[] = [
  {
    titulo: 'Exames auditivos',
    descricao: 'Para saber como está a audição, do recém-nascido ao idoso.',
    itens: [
      {
        nome: 'Audiometria',
        descricao: 'Mede o quanto você ouve, dos sons graves aos agudos, e como entende as palavras.',
        icone: 'waves',
      },
      {
        nome: 'Imitanciometria',
        descricao: 'Avalia o tímpano e a parte do ouvido logo atrás dele. É rápida e não dói.',
        icone: 'ear',
      },
      {
        nome: 'Teste da orelhinha',
        descricao: 'Triagem auditiva do bebê, feita enquanto ele dorme ou está calmo.',
        icone: 'baby',
      },
      {
        nome: 'BERA (PEATE)',
        descricao: 'Avalia a audição pela resposta do cérebro ao som. Indicado para bebês e para quem não consegue responder ao exame comum.',
        icone: 'activity',
      },
      {
        nome: 'Processamento auditivo',
        descricao: 'Para quem ouve, mas tem dificuldade de entender, principalmente em lugares com barulho.',
        icone: 'brain',
      },
    ],
  },
  {
    titulo: 'Terapias e acompanhamento',
    descricao: 'Atendimento contínuo, com orientação para a família.',
    itens: [
      {
        nome: 'Fala e linguagem',
        descricao: 'Para crianças que demoram a falar, trocam sons ou têm dificuldade de se expressar.',
        icone: 'speech',
      },
      {
        nome: 'Leitura e escrita',
        descricao: 'Apoio para dificuldades de aprendizagem ligadas à leitura e à escrita.',
        icone: 'book',
      },
      {
        nome: 'Voz',
        descricao: 'Para rouquidão, cansaço ao falar e para quem usa muito a voz no trabalho.',
        icone: 'mic',
      },
      {
        nome: 'Motricidade orofacial',
        descricao: 'Trabalha mastigação, deglutição e respiração, de bebês a adultos.',
        icone: 'smile',
      },
      {
        nome: 'Aparelho auditivo',
        descricao: 'Orientação na escolha e na adaptação do aparelho, com acompanhamento depois.',
        icone: 'hearingAid',
      },
    ],
  },
];
