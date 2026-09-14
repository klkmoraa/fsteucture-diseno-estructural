import type { DesignSnapshot, DesignView, ThemeMode } from '../domain/design';
import { Icon } from './icons';
import { StatusBadge } from './StatusBadge';

const views: { id: DesignView; label: string }[] = [
  { id: 'model', label: 'Modelo' },
  { id: 'results', label: 'Diagramas' },
  { id: 'design', label: 'Diseño' },
  { id: 'evidence', label: 'Evidencia' },
];

export function Topbar({
  snapshot,
  activeView,
  theme,
  saved,
  onViewChange,
  onThemeChange,
}: {
  snapshot: DesignSnapshot;
  activeView: DesignView;
  theme: ThemeMode;
  saved: boolean;
  onViewChange: (view: DesignView) => void;
  onThemeChange: (theme: ThemeMode) => void;
}) {
  return (
    <header className="topbar">
      <div className="topbar__brand" aria-label="FusionStructure · FStructure">
        <img src="/brand/fusionstructure-mark.svg" alt="" className="topbar__mark" />
        <span className="topbar__wordmark">FStructure</span>
        <span className="topbar__separator" aria-hidden="true">/</span>
        <span className="topbar__product">Design Workbench</span>
      </div>

      <nav className="topbar__nav" aria-label="Superficies del proyecto">
        <span className="topbar__member">{snapshot.projectName}</span>
        {views.map((view) => (
          <button
            key={view.id}
            className={`topbar__nav-item${activeView === view.id ? ' is-active' : ''}`}
            type="button"
            aria-current={activeView === view.id ? 'page' : undefined}
            onClick={() => onViewChange(view.id)}
          >
            {view.label}
          </button>
        ))}
      </nav>

      <div className="topbar__actions">
        <span className={`save-state${saved ? ' is-saved' : ' is-dirty'}`}>
          <span aria-hidden="true" />
          {saved ? 'Guardado local' : 'Cambios sin guardar'}
        </span>
        <StatusBadge status={snapshot.status} compact />
        <span className="topbar__code">{snapshot.code.code} {snapshot.code.edition}</span>
        <div className="theme-switch" aria-label="Tema">
          <button
            type="button"
            className={theme === 'day' ? 'is-active' : ''}
            onClick={() => onThemeChange('day')}
            aria-label="Usar tema de día"
            aria-pressed={theme === 'day'}
          >
            <Icon.Sun size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={theme === 'night' ? 'is-active' : ''}
            onClick={() => onThemeChange('night')}
            aria-label="Usar tema de noche"
            aria-pressed={theme === 'night'}
          >
            <Icon.Moon size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

