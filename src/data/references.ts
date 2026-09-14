import type { DesignReference } from '../domain/design';

export const concreteReference: DesignReference = {
  code: 'NTC CDMX',
  edition: '2017',
  clause: '4.2.2',
  sourceUrl:
    'https://www.smie.org.mx/uploads/1/2022-11/normas_tecnicas_complementarias_diseno_construccion_estructuras_concreto_2017.pdf',
};

export const normativeSources = [
  {
    label: 'NTC Concreto',
    edition: 'CDMX · 2017',
    filename: 'ntc-concreto-cdmx-2017.pdf',
    url: concreteReference.sourceUrl,
  },
  {
    label: 'NTC Acero',
    edition: 'CDMX · 2020',
    filename: 'ntc-acero-cdmx-2020.pdf',
    url: 'https://www.smie.org.mx/uploads/1/2022-11/ntc_acero_2020.pdf',
  },
  {
    label: 'NTC Sismo',
    edition: 'CDMX · 2020',
    filename: 'ntc-sismo-cdmx-2020.pdf',
    url: 'https://www.smie.org.mx/uploads/1/2022-11/normas_tecnicas_complementarias_diseno_sismo_2020.pdf',
  },
] as const;

