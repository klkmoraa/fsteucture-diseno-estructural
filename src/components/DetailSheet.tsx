import type { DesignSnapshot, ResultSignal } from '../domain/design';
import { ConcreteSectionGlyph } from './icons';

export function DetailSheet({
  snapshot,
  activeSignal,
}: {
  snapshot: DesignSnapshot;
  activeSignal: ResultSignal;
}) {
  const { widthMm, depthMm, coverMm, spanM } = snapshot.inputs;
  const steelActive = activeSignal === 'longitudinalSteel' || activeSignal === 'stirrups';

  return (
    <section className={`detail-sheet${steelActive ? ' is-focused' : ''}`} aria-label="Detalle de armado">
      <div className="section-heading section-heading--detail">
        <div className="detail-sheet__title">
          <ConcreteSectionGlyph className="surface-icon" />
          <div>
            <span className="section-heading__kicker">Hoja · detalle 01</span>
            <h2>Detalle de armado</h2>
          </div>
        </div>
        <span className="section-heading__meta">Escala de lectura · 1 : 20</span>
      </div>
      <div className="detail-sheet__body">
        <div className="section-drawing">
          <span className="drawing-label">Sección</span>
          <svg viewBox="0 0 260 210" role="img" aria-label={`Sección de ${widthMm} por ${depthMm} milímetros`}>
            <line x1="54" y1="26" x2="54" y2="184" className="drawing-dimension" />
            <path d="M 48 32h12M 48 178h12" className="drawing-dimension" />
            <text x="35" y="108" className="drawing-data" transform="rotate(-90 35 108)">{depthMm} mm</text>
            <rect x="86" y="26" width="88" height="158" rx="3" className="concrete-fill" />
            <rect x="96" y="36" width="68" height="138" rx="2" className="stirrup-line" />
            <circle cx="108" cy="49" r="7" className="rebar-dot" />
            <circle cx="152" cy="49" r="7" className="rebar-dot" />
            <circle cx="108" cy="161" r="7" className="rebar-dot" />
            <circle cx="152" cy="161" r="7" className="rebar-dot" />
            <line x1="86" y1="198" x2="174" y2="198" className="drawing-dimension" />
            <path d="M 92 192v12M 168 192v12" className="drawing-dimension" />
            <text x="130" y="190" textAnchor="middle" className="drawing-data">{widthMm} mm</text>
          </svg>
        </div>
        <div className="detail-legend">
          <div className="detail-legend__row">
            <span className="legend-marker legend-marker--steel" />
            <span>Acero longitudinal</span>
            <strong>{snapshot.results.longitudinalSteelMm2.toLocaleString('es-MX')} <small>mm²</small></strong>
          </div>
          <div className="detail-legend__row">
            <span className="legend-marker legend-marker--stirrup" />
            <span>Estribos</span>
            <strong>Ø{snapshot.results.stirrupDiameterMm} @ {snapshot.results.stirrupSpacingMm} <small>mm</small></strong>
          </div>
          <div className="detail-legend__row">
            <span className="legend-marker legend-marker--cover" />
            <span>Recubrimiento</span>
            <strong>{coverMm} <small>mm</small></strong>
          </div>
        </div>
        <div className="elevation-drawing">
          <span className="drawing-label">Elevación longitudinal</span>
          <svg viewBox="0 0 590 210" role="img" aria-label="Detalle longitudinal de viga con estribos">
            <line x1="40" y1="80" x2="550" y2="80" className="drawing-dimension" />
            <rect x="40" y="80" width="510" height="54" rx="3" className="concrete-fill" />
            <line x1="50" y1="91" x2="540" y2="91" className="bar-line" />
            <line x1="50" y1="123" x2="540" y2="123" className="bar-line" />
            {Array.from({ length: 17 }, (_, index) => {
              const x = 58 + index * 30;
              return <line key={x} x1={x} y1="85" x2={x} y2="129" className="stirrup-bar" />;
            })}
            <path d="M 40 156h510M 40 150v12M 550 150v12" className="drawing-dimension" />
            <text x="295" y="180" textAnchor="middle" className="drawing-data">{spanM.toFixed(2)} m</text>
            <path d="M 96 62h102" className="drawing-dimension" />
            <text x="147" y="48" textAnchor="middle" className="drawing-data">Estribos @ {snapshot.results.stirrupSpacingMm} mm</text>
            <text x="524" y="72" textAnchor="end" className="drawing-data">{snapshot.results.longitudinalBars}</text>
          </svg>
        </div>
      </div>
      <div className="detail-sheet__footer">
        <span>El detalle declara el armado que el caso de demostración propone.</span>
        <span className="detail-sheet__footer-code">No emite plano · revisar recubrimiento y anclajes</span>
      </div>
    </section>
  );
}

