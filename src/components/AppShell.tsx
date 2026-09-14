import type {
  AppAction,
  AppState,
} from '../appState';
import type { DesignInputPatch } from '../domain/design';
import { DesignInspector } from './DesignInspector';
import { EvidencePanel } from './EvidencePanel';
import { ModelCanvas } from './ModelCanvas';
import { ProjectRail } from './ProjectRail';
import { ResultStack } from './ResultStack';
import { DetailSheet } from './DetailSheet';
import { Topbar } from './Topbar';

export function AppShell({
  state,
  dispatch,
}: {
  state: AppState;
  dispatch: (action: AppAction) => void;
}) {
  const activeCheck = state.snapshot.checks.find((check) => check.id === state.activeCheckId) ?? state.snapshot.checks[0];
  const handleApply = (patch: DesignInputPatch) => dispatch({ type: 'apply-inputs', patch });

  return (
    <div className="workbench" data-theme={state.theme}>
      <Topbar
        snapshot={state.snapshot}
        activeView={state.activeView}
        theme={state.theme}
        saved={state.saved}
        onViewChange={(view) => dispatch({ type: 'set-view', view })}
        onThemeChange={(theme) => dispatch({ type: 'set-theme', theme })}
      />
      <div className="workbench__body">
        <ProjectRail
          activeView={state.activeView}
          onViewChange={(view) => dispatch({ type: 'set-view', view })}
        />
        <main className="workbench__main">
          <div className="workbench__surface-heading">
            <div>
              <span className="surface-kicker">{state.activeView === 'evidence' ? 'Trazabilidad' : 'Elemento · B-01'}</span>
              <h1>{state.activeView === 'evidence' ? 'Evidencia de diseño' : 'Viga de concreto'}</h1>
            </div>
            <span className="surface-meta">{state.snapshot.version}</span>
          </div>
          <div className="workbench__content">
            <div className="workbench__center">
              <ModelCanvas
                snapshot={state.snapshot}
                activeSignal={state.activeSignal}
                activeView={state.activeView}
              />
              {state.activeView !== 'evidence' && (
                <ResultStack
                  snapshot={state.snapshot}
                  activeSignal={state.activeSignal}
                  onSignalChange={(signal) => dispatch({ type: 'set-signal', signal })}
                />
              )}
              {(state.activeView === 'model' || state.activeView === 'design') && (
                <DetailSheet snapshot={state.snapshot} activeSignal={state.activeSignal} />
              )}
              {state.activeView === 'evidence' && activeCheck && (
                <EvidencePanel
                  check={activeCheck}
                  variant="full"
                  onSelectCheck={(checkId) => dispatch({ type: 'set-check', checkId })}
                  checks={state.snapshot.checks}
                />
              )}
            </div>
            <aside className="workbench__inspector" aria-label="Inspector de diseño">
              <DesignInspector
                snapshot={state.snapshot}
                activeView={state.activeView}
                onApply={handleApply}
                onSave={() => dispatch({ type: 'save-version' })}
                saved={state.saved}
              />
              {state.activeView !== 'evidence' && activeCheck && (
                <EvidencePanel
                  check={activeCheck}
                  onSelectCheck={(checkId) => dispatch({ type: 'set-check', checkId })}
                  checks={state.snapshot.checks}
                />
              )}
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

