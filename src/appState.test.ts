import { describe, expect, it } from 'vitest';
import { createDemoDesign } from './domain/demoDesign';
import { appReducer, createInitialAppState } from './appState';

describe('workbench state', () => {
  it('changes the visible view and keeps the selected result signal', () => {
    const initial = createInitialAppState();
    const results = appReducer(initial, { type: 'set-view', view: 'results' });
    const selected = appReducer(results, {
      type: 'set-signal',
      signal: 'shear',
    });

    expect(selected.activeView).toBe('results');
    expect(selected.activeSignal).toBe('shear');
  });

  it('updates the snapshot immutably and marks changes as unsaved', () => {
    const initial = createInitialAppState();
    const updated = appReducer(initial, {
      type: 'apply-inputs',
      patch: { loadKnm: 16 },
    });

    expect(updated.snapshot.results.shearKn).toBe(48);
    expect(updated.snapshot.version).toContain('borrador');
    expect(updated.saved).toBe(false);
    expect(updated.snapshot).not.toBe(initial.snapshot);
  });

  it('saves a new version without losing the active design', () => {
    const initial = createInitialAppState();
    const updated = appReducer(initial, {
      type: 'apply-inputs',
      patch: { loadKnm: 16 },
    });
    const saved = appReducer(updated, { type: 'save-version' });

    expect(saved.saved).toBe(true);
    expect(saved.snapshot.version).toBe('v05 · guardado local');
    expect(saved.snapshot.results.shearKn).toBe(48);
  });

  it('can initialize from a persisted snapshot', () => {
    const snapshot = createDemoDesign();
    const state = createInitialAppState(snapshot);

    expect(state.snapshot.projectId).toBe(snapshot.projectId);
    expect(state.saved).toBe(true);
  });
});
