import type { DesignSnapshot, ResultSignal } from '../domain/design';
import { Icon } from './icons';

type ResultRow = {
  id: Extract<ResultSignal, 'moment' | 'shear' | 'deflection'>;
  label: string;
  unit: string;
  value: (snapshot: DesignSnapshot) => string;
  color: string;
};

const resultRows: ResultRow[] = [
  {
    id: 'moment',
    label: 'Momento',
    unit: 'kN·m',
    value: (snapshot) => snapshot.results.momentKnm.toFixed(1),
    color: 'var(--fs-signal-moment)',
  },
  {
    id: 'shear',
    label: 'Cortante',
    unit: 'kN',
    value: (snapshot) => snapshot.results.shearKn.toFixed(1),
    color: 'var(--fs-signal-shear)',
  },
  {
    id: 'deflection',
    label: 'Deformada',
    unit: 'mm',
    value: (snapshot) => snapshot.results.deflectionMm.toFixed(1),
    color: 'var(--fs-signal-deflection)',
  },
];

function ResultPlot({ id, color }: { id: ResultRow['id']; color: string }) {
  const paths = {
    moment: 'M 12 78 C 104 76 170 34 260 28 C 350 34 416 76 508 78',
    shear: 'M 12 20 L 260 78 L 508 20',
    deflection: 'M 12 20 C 96 23 150 80 260 84 C 370 80 424 23 508 20',
  };
  return (
    <svg className="result-plot" viewBox="0 0 520 100" role="img" aria-label={`Diagrama de ${id}`}>
      <path d="M 12 20H508 M 12 50H508 M 12 80H508" className="plot-grid" />
      <path d="M 12 50H508" className="plot-axis" />
      {id !== 'deflection' && <path d={id === 'moment' ? 'M 12 50 C 104 48 170 8 260 4 C 350 8 416 48 508 50 Z' : 'M 12 20 L 260 50 L 508 20 L 508 50 L 260 50 L 12 50 Z'} fill={color} opacity="0.13" />}
      <path d={paths[id]} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={id === 'shear' ? 12 : 260} cy={id === 'shear' ? 20 : id === 'moment' ? 4 : 84} r="4" fill={color} />
    </svg>
  );
}

export function ResultStack({
  snapshot,
  activeSignal,
  onSignalChange,
}: {
  snapshot: DesignSnapshot;
  activeSignal: ResultSignal;
  onSignalChange: (signal: ResultSignal) => void;
}) {
  return (
    <section className="result-stack" aria-label="Diagramas de resultados">
      <div className="section-heading">
        <div>
          <span className="section-heading__kicker">Respuesta · trazas semánticas</span>
          <h2>Diagramas</h2>
        </div>
        <span className="section-heading__meta">caso gravitacional · C01</span>
      </div>
      <div className="result-stack__rows">
        {resultRows.map((row) => (
          <button
            type="button"
            key={row.id}
            className={`result-row${activeSignal === row.id ? ' is-active' : ''}`}
            onClick={() => onSignalChange(row.id)}
          >
            <span className="result-row__label">
              <span className="result-row__signal" style={{ background: row.color }} />
              <span>
                <strong>{row.label}</strong>
                <small>{row.unit}</small>
              </span>
            </span>
            <ResultPlot id={row.id} color={row.color} />
            <span className="result-row__value" style={{ color: row.color }}>
              {row.value(snapshot)}
              <small>{row.unit}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="reinforcement-strip">
        <div className="reinforcement-strip__title">
          <Icon.SlidersHorizontal size={16} aria-hidden="true" />
          <span>Diseño de armado</span>
        </div>
        <button type="button" className={`reinforcement-cell${activeSignal === 'longitudinalSteel' ? ' is-active' : ''}`} onClick={() => onSignalChange('longitudinalSteel')}>
          <span>Acero longitudinal</span>
          <strong>{snapshot.results.longitudinalSteelMm2.toLocaleString('es-MX')} <small>mm²</small></strong>
          <em>{snapshot.results.longitudinalBars}</em>
        </button>
        <button type="button" className={`reinforcement-cell${activeSignal === 'stirrups' ? ' is-active' : ''}`} onClick={() => onSignalChange('stirrups')}>
          <span>Estribos</span>
          <strong>Ø{snapshot.results.stirrupDiameterMm} <small>@ {snapshot.results.stirrupSpacingMm} mm</small></strong>
          <em>2 ramas</em>
        </button>
      </div>
    </section>
  );
}

