import { useEffect, useState } from 'react';
import type { DesignInput, DesignSnapshot, DesignView } from '../domain/design';
import { Icon } from './icons';
import { StatusBadge } from './StatusBadge';

function NumberField({
  id,
  label,
  value,
  unit,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="number-field" htmlFor={id}>
      <span>{label}</span>
      <span className="number-field__control">
        <input id={id} type="number" value={value} step="0.1" onChange={(event) => onChange(Number(event.currentTarget.value))} />
        <small>{unit}</small>
      </span>
    </label>
  );
}

export function DesignInspector({
  snapshot,
  activeView,
  onApply,
  onSave,
  saved,
}: {
  snapshot: DesignSnapshot;
  activeView: DesignView;
  onApply: (patch: Partial<DesignInput>) => void;
  onSave: () => void;
  saved: boolean;
}) {
  const [draft, setDraft] = useState(snapshot.inputs);

  useEffect(() => {
    setDraft(snapshot.inputs);
  }, [snapshot.inputs]);

  const update = (key: keyof DesignInput) => (value: number) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className={`inspector${activeView === 'design' ? ' is-focused' : ''}`} aria-label="Parámetros de la viga">
      <div className="inspector__header">
        <div>
          <span className="inspector__kicker">Entrada · editable</span>
          <h2>Parámetros de la viga</h2>
        </div>
        <Icon.SlidersHorizontal size={17} aria-hidden="true" />
      </div>
      <div className="inspector__section">
        <div className="inspector__section-heading">
          <span>Sección rectangular</span>
          <span className="inspector__section-code">b × h</span>
        </div>
        <div className="inspector__fields inspector__fields--two">
          <NumberField id="width" label="b" value={draft.widthMm} unit="mm" onChange={update('widthMm')} />
          <NumberField id="depth" label="h" value={draft.depthMm} unit="mm" onChange={update('depthMm')} />
        </div>
        <div className="inspector__mini-section">
          <div className="mini-section-drawing" aria-hidden="true">
            <span />
            <i />
          </div>
          <span>Concreto reforzado<br /><strong>{draft.widthMm} × {draft.depthMm} mm</strong></span>
        </div>
      </div>
      <div className="inspector__section">
        <div className="inspector__section-heading">
          <span>Material y cargas</span>
          <span className="inspector__section-code">C01</span>
        </div>
        <div className="inspector__fields">
          <NumberField id="concrete" label="f'c" value={draft.concreteMpa} unit="MPa" onChange={update('concreteMpa')} />
          <NumberField id="load" label="Carga distribuida w" value={draft.loadKnm} unit="kN/m" onChange={update('loadKnm')} />
          <NumberField id="span" label="Claro (l)" value={draft.spanM} unit="m" onChange={update('spanM')} />
          <NumberField id="cover" label="Recubrimiento" value={draft.coverMm} unit="mm" onChange={update('coverMm')} />
        </div>
      </div>
      <div className="inspector__actions">
        <button type="button" className="button button--primary" onClick={() => onApply(draft)}>
          <Icon.Check size={16} aria-hidden="true" />
          Aplicar cambios
        </button>
        <button type="button" className="button button--secondary" onClick={onSave} disabled={saved}>
          <Icon.Save size={16} aria-hidden="true" />
          {saved ? 'Versión guardada' : 'Guardar versión'}
        </button>
      </div>
      <div className="inspector__status-line">
        <StatusBadge status={snapshot.status} />
        <span>{snapshot.code.code} · edición {snapshot.code.edition}</span>
      </div>
    </section>
  );
}

