import type { DesignCheck } from '../domain/design';
import { Icon } from './icons';
import { StatusBadge } from './StatusBadge';

function checkIcon(state: DesignCheck['state']) {
  if (state === 'review') return <Icon.CircleAlert size={15} aria-hidden="true" />;
  if (state === 'experimental') return <Icon.TriangleAlert size={15} aria-hidden="true" />;
  return <Icon.Check size={15} aria-hidden="true" />;
}

export function EvidencePanel({
  check,
  checks,
  onSelectCheck,
  variant = 'compact',
}: {
  check: DesignCheck;
  checks: DesignCheck[];
  onSelectCheck: (checkId: string) => void;
  variant?: 'compact' | 'full';
}) {
  return (
    <section className={`evidence-panel evidence-panel--${variant}`} aria-label="Evidencia normativa">
      <div className="section-heading evidence-panel__heading">
        <div>
          <span className="section-heading__kicker">Trazabilidad · decisión</span>
          <h2>Evidencia</h2>
        </div>
        <Icon.BookOpen size={17} aria-hidden="true" />
      </div>
      {variant === 'full' && (
        <div className="evidence-panel__intro">
          <p>El resultado conserva la hipótesis, la unidad y la referencia que explican la decisión. Si algo falta, el estado permanece en revisión.</p>
          <span className="evidence-panel__notice"><Icon.TriangleAlert size={14} aria-hidden="true" /> Prototipo experimental · no certifica diseño</span>
        </div>
      )}
      <div className="evidence-panel__checks">
        {checks.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`evidence-check${item.id === check.id ? ' is-active' : ''}`}
            onClick={() => onSelectCheck(item.id)}
          >
            <span className={`evidence-check__icon evidence-check__icon--${item.state}`}>{checkIcon(item.state)}</span>
            <span className="evidence-check__copy">
              <strong>{item.label}</strong>
              <small>{item.reference.code} {item.reference.edition} · § {item.reference.clause}</small>
            </span>
            <StatusBadge status={item.state} compact />
          </button>
        ))}
      </div>
      <div className="evidence-detail">
        <div className="evidence-detail__topline">
          <span className="evidence-detail__label">{check.reference.code} · {check.reference.edition}</span>
          <span className="evidence-detail__clause">§ {check.reference.clause}</span>
        </div>
        <h3>{check.detail}</h3>
        <div className="evidence-detail__ratio">
          <span>Relación ilustrativa</span>
          <strong>{check.ratio?.toFixed(2) ?? '—'}</strong>
          <span>{check.unit ?? 'revisión'}</span>
        </div>
        <div className="evidence-detail__assumptions">
          <span>Hipótesis que siguen abiertas</span>
          <ul>
            {check.assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}
          </ul>
        </div>
        <a className="evidence-detail__source" href={check.reference.sourceUrl} target="_blank" rel="noreferrer">
          Abrir fuente pública <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

