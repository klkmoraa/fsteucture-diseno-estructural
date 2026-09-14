import type { DesignView } from '../domain/design';
import { BeamGlyph, ConcreteSectionGlyph, EvidenceGlyph, Icon } from './icons';

export function ProjectRail({
  activeView,
  onViewChange,
}: {
  activeView: DesignView;
  onViewChange: (view: DesignView) => void;
}) {
  return (
    <aside className="project-rail" aria-label="Árbol del proyecto">
      <div className="project-rail__heading">
        <span>Proyecto</span>
        <Icon.ChevronDown size={16} aria-hidden="true" />
      </div>
      <div className="project-rail__tree">
        <div className="tree-node tree-node--root">
          <Icon.Layers size={15} aria-hidden="true" />
          <span>Estructura</span>
          <span className="tree-node__count">01</span>
        </div>
        <button
          type="button"
          className={`tree-node tree-node--active${activeView === 'model' ? ' is-selected' : ''}`}
          onClick={() => onViewChange('model')}
        >
          <BeamGlyph className="tree-glyph" />
          <span>Viga de concreto</span>
          <span className="tree-node__dot" aria-label="Elemento seleccionado" />
        </button>
        <button
          type="button"
          className={`tree-node tree-node--child${activeView === 'design' ? ' is-selected' : ''}`}
          onClick={() => onViewChange('design')}
        >
          <ConcreteSectionGlyph className="tree-glyph" />
          <span>Sección</span>
        </button>
        <button
          type="button"
          className={`tree-node tree-node--child${activeView === 'results' ? ' is-selected' : ''}`}
          onClick={() => onViewChange('results')}
        >
          <Icon.BarChart3 size={16} aria-hidden="true" />
          <span>Diagramas</span>
        </button>
        <button
          type="button"
          className={`tree-node tree-node--child${activeView === 'evidence' ? ' is-selected' : ''}`}
          onClick={() => onViewChange('evidence')}
        >
          <EvidenceGlyph className="tree-glyph" />
          <span>Evidencia</span>
        </button>
      </div>
      <div className="project-rail__footer">
        <span className="project-rail__footer-label">Sistema</span>
        <span className="project-rail__footer-value">SI · mm · kN</span>
      </div>
    </aside>
  );
}

