import type { DesignSnapshot, DesignView, ResultSignal } from '../domain/design';
import { BeamGlyph, Icon } from './icons';

const loadXs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const signalLabels: Record<ResultSignal, string> = {
  moment: 'Momento',
  shear: 'Cortante',
  deflection: 'Deformada',
  longitudinalSteel: 'Acero longitudinal',
  stirrups: 'Estribos',
};

export function ModelCanvas({
  snapshot,
  activeSignal,
  activeView,
}: {
  snapshot: DesignSnapshot;
  activeSignal: ResultSignal;
  activeView: DesignView;
}) {
  const { spanM, loadKnm } = snapshot.inputs;
  const focusLabel = signalLabels[activeSignal];

  return (
    <section className={`model-surface model-surface--${activeView}`} aria-label="Modelo estructural">
      <div className="model-surface__header">
        <div className="model-surface__title">
          <BeamGlyph className="surface-icon" />
          <div>
            <h2>Modelo</h2>
            <span>{snapshot.member.id} · {snapshot.member.label}</span>
          </div>
        </div>
        <div className="model-surface__meta">
          <span className="model-surface__focus"><i aria-hidden="true" /> {focusLabel}</span>
          <span className="model-surface__units">SI · kN · m</span>
        </div>
      </div>
      <div className="model-canvas">
        <svg viewBox="0 0 900 360" role="img" aria-label={`Viga simplemente apoyada de ${spanM.toFixed(2)} metros con carga distribuida de ${loadKnm.toFixed(1)} kN/m`}>
          <defs>
            <pattern id="model-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="var(--fs-line)" strokeWidth="0.7" opacity="0.55" />
            </pattern>
            <marker id="load-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--fs-signal-moment)" />
            </marker>
          </defs>
          <rect x="16" y="14" width="868" height="332" rx="12" fill="url(#model-grid)" opacity="0.6" />
          <line x1="112" y1="270" x2="792" y2="270" className="svg-guide" />
          <line x1="112" y1="110" x2="792" y2="110" className="svg-guide svg-guide--faint" />
          {loadXs.map((step) => {
            const x = 132 + step * 55;
            return (
              <line
                key={step}
                x1={x}
                y1="70"
                x2={x}
                y2="112"
                className="svg-load"
                markerEnd="url(#load-arrow)"
              />
            );
          })}
          <line x1="132" y1="70" x2="792" y2="70" className="svg-load" />
          <text x="462" y="48" textAnchor="middle" className="svg-label svg-label--data">w = {loadKnm.toFixed(1)} kN/m</text>
          <rect x="112" y="110" width="680" height="38" rx="4" className="svg-beam" />
          <line x1="112" y1="110" x2="792" y2="110" className="svg-beam-highlight" />
          <path d="M 112 148 L 92 182 L 132 182 Z" className="svg-support" />
          <path d="M 792 148 L 772 182 L 812 182 Z" className="svg-support" />
          <circle cx="792" cy="190" r="18" className="svg-roller" />
          <path d="M 74 192h62M 754 210h78" className="svg-ground" />
          <path d="M 80 192l12 -12M 96 192l12 -12M 112 192l12 -12M 760 210l12 -12M 776 210l12 -12M 792 210l12 -12M 808 210l12 -12" className="svg-ground" />
          <line x1="112" y1="238" x2="792" y2="238" className="svg-dimension" />
          <path d="M 112 230v16M 792 230v16" className="svg-dimension" />
          <path d="M 120 238l12 -4v8zM 784 238l-12 -4v8z" className="svg-dimension-fill" />
          <text x="452" y="262" textAnchor="middle" className="svg-label svg-label--data">{spanM.toFixed(2)} m</text>
          <path d="M 112 148 L 168 158 L 224 168 L 280 176 L 336 181 L 392 184 L 448 185 L 504 184 L 560 181 L 616 176 L 672 168 L 728 158 L 792 148" className="svg-deflection" opacity={activeSignal === 'deflection' ? 1 : 0.55} />
          {activeSignal === 'moment' && <circle cx="452" cy="184" r="6" className="svg-active-point svg-active-point--moment" />}
          {activeSignal === 'shear' && <circle cx="168" cy="158" r="6" className="svg-active-point svg-active-point--shear" />}
          {activeSignal === 'deflection' && <circle cx="452" cy="185" r="6" className="svg-active-point svg-active-point--deflection" />}
          <g transform="translate(44 286)">
            <line x1="0" y1="0" x2="28" y2="0" className="axis-x" />
            <line x1="0" y1="0" x2="0" y2="-28" className="axis-y" />
            <text x="34" y="4" className="axis-label">x</text>
            <text x="-8" y="-34" className="axis-label">y</text>
          </g>
          <g transform="translate(730 292)">
            <Icon.Ruler size={15} aria-hidden="true" />
            <text x="22" y="12" className="svg-label svg-label--muted">Vista 2D</text>
          </g>
        </svg>
      </div>
      <div className="model-surface__footer">
        <span><i className="legend-dot legend-dot--line" /> Geometría original</span>
        <span><i className="legend-dot legend-dot--deflection" /> Respuesta {focusLabel.toLowerCase()}</span>
        <span className="model-surface__footer-note">No normativo · datos de demostración</span>
      </div>
    </section>
  );
}

