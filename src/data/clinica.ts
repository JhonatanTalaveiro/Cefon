// Dados oficiais da clínica. Tudo o que aparece no site (e nos dados para o Google) sai daqui.
// Nome, endereço, telefone e horário precisam ficar idênticos aos do perfil no Google.
// Levantados no Google em ago/2026. Reconfirmar antes de publicar.

const enderecoTexto = 'R. Antônio Teófilo, 348 - Centro, Mococa - SP, 13738-035';

export const clinica = {
  nome: 'CEFON',
  nomeCompleto: 'CEFON Centro Fonoaudiológico',

  endereco: {
    rua: 'R. Antônio Teófilo, 348',
    bairro: 'Centro',
    cidade: 'Mococa',
    uf: 'SP',
    cep: '13738-035',
  },

  telefone: {
    exibicao: '(19) 3665-6803',
    link: 'tel:+551936656803',
    internacional: '+55 19 3665-6803',
  },

  // PENDENTE: a clínica atende por WhatsApp? Com `null`, o botão não aparece.
  // Exemplo: { exibicao: '(19) 99999-9999', numero: '5519999999999' }
  whatsapp: null as null | { exibicao: string; numero: string },

  horarios: [
    { dias: 'Segunda a quinta', curto: 'Seg. a qui.', abre: '07:30', fecha: '18:00', diasSchema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'] },
    { dias: 'Sexta', curto: 'Sex.', abre: '07:30', fecha: '17:00', diasSchema: ['Friday'] },
    { dias: 'Sábado e domingo', curto: 'Sáb. e dom.', abre: null, fecha: null, diasSchema: [] },
  ],

  // PENDENTE: nome completo e CRFa da responsável técnica.
  responsavelTecnica: {
    nome: 'Nome da Responsável Técnica',
    crfa: 'CRFa 2-XXXXX',
  },

  // PENDENTE: coordenadas exatas do perfil no Google (usadas nos dados estruturados).
  geo: null as null | { lat: number; lng: number },

  mapas: {
    rota: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`CEFON Centro Fonoaudiológico, ${enderecoTexto}`)}`,
    abrir: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`CEFON Centro Fonoaudiológico, ${enderecoTexto}`)}`,
    embed: `https://maps.google.com/maps?q=${encodeURIComponent(enderecoTexto)}&z=17&hl=pt-BR&output=embed`,
  },
};

/** "07:30" → "7h30"; "18:00" → "18h" */
export function formatarHora(hora: string) {
  const [h, m] = hora.split(':');
  return `${Number(h)}h${m === '00' ? '' : m}`;
}

export function enderecoCompleto() {
  const { rua, bairro, cidade, uf, cep } = clinica.endereco;
  return `${rua}, ${bairro}, ${cidade}/${uf}, CEP ${cep}`;
}

export function linkWhatsapp() {
  if (!clinica.whatsapp) return null;
  const texto = encodeURIComponent('Olá! Vim pelo site e gostaria de informações.');
  return `https://wa.me/${clinica.whatsapp.numero}?text=${texto}`;
}
