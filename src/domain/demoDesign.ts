import type { DesignSnapshot } from './design';

const concreteReference = {
  id: 'ntc-cdmx-2017' as const,
  code: 'NTC CDMX',
  edition: '2017',
  clause: '4.2.2',
  sourceUrl:
    'https://www.smie.org.mx/uploads/1/2022-11/normas_tecnicas_complementarias_diseno_construccion_estructuras_concreto_2017.pdf',
};

export function createDemoDesign(): DesignSnapshot {
  return {
    projectId: 'demo-beam-01',
    projectName: 'Viga de concreto',
    status: 'experimental',
    version: 'v04 · 13 sep 2026',
    code: concreteReference,
    member: {
      id: 'B-01',
      label: 'Viga de concreto',
      type: 'beam',
      material: 'reinforced-concrete',
    },
    inputs: {
      spanM: 6,
      widthMm: 300,
      depthMm: 600,
      concreteMpa: 25,
      loadKnm: 25,
      coverMm: 40,
    },
    results: {
      momentKnm: 114.9,
      shearKn: 75,
      deflectionMm: 16.8,
      longitudinalSteelMm2: 4524,
      stirrupSpacingMm: 150,
      stirrupDiameterMm: 10,
      longitudinalBars: '4Ø25',
    },
    checks: [
      {
        id: 'flexion',
        label: 'Flexión en vigas de concreto reforzado',
        state: 'review',
        ratio: 0.78,
        unit: 'φMn ≥ Mu',
        reference: concreteReference,
        assumptions: [
          'Sección rectangular, comportamiento lineal de demostración.',
          'Carga distribuida estática en una viga simplemente apoyada.',
          'El armado mostrado es ilustrativo y requiere revisión profesional.',
        ],
        detail: 'La resistencia ilustrativa supera la demanda del caso de ejemplo.',
      },
      {
        id: 'shear',
        label: 'Cortante y separación de estribos',
        state: 'experimental',
        ratio: 0.64,
        unit: 'φVn ≥ Vu',
        reference: { ...concreteReference, clause: '5.3.4' },
        assumptions: [
          'Estribo cerrado de dos ramas.',
          'Separación redondeada al múltiplo constructivo mostrado.',
        ],
        detail: 'El espaciamiento queda dentro del rango visual del prototipo.',
      },
      {
        id: 'serviceability',
        label: 'Deformación de servicio',
        state: 'review',
        ratio: 0.84,
        unit: 'Δ ≤ Δlim',
        reference: { ...concreteReference, clause: '7.2' },
        assumptions: [
          'Flecha calculada como respuesta ilustrativa para la demo.',
          'No incluye redistribución, fisuración ni efectos de largo plazo.',
        ],
        detail: 'La flecha se muestra para leer la tendencia, no como dictamen.',
      },
    ],
  };
}

