import type {
  DesignInputPatch,
  DesignView,
  ResultSignal,
  ThemeMode,
  DesignSnapshot,
} from './domain/design';
import { createDemoDesign } from './domain/demoDesign';
import { updateDesignInputs } from './domain/designTransforms';

export type AppState = {
  snapshot: DesignSnapshot;
  activeView: DesignView;
  activeSignal: ResultSignal;
  activeCheckId: string;
  theme: ThemeMode;
  saved: boolean;
};

export type AppAction =
  | { type: 'set-view'; view: DesignView }
  | { type: 'set-signal'; signal: ResultSignal }
  | { type: 'set-check'; checkId: string }
  | { type: 'set-theme'; theme: ThemeMode }
  | { type: 'apply-inputs'; patch: DesignInputPatch }
  | { type: 'save-version' };

export function createInitialAppState(snapshot = createDemoDesign()): AppState {
  return {
    snapshot,
    activeView: 'model',
    activeSignal: 'moment',
    activeCheckId: 'flexion',
    theme: 'night',
    saved: true,
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'set-view':
      return { ...state, activeView: action.view };
    case 'set-signal':
      return { ...state, activeSignal: action.signal };
    case 'set-check':
      return { ...state, activeCheckId: action.checkId, activeView: 'evidence' };
    case 'set-theme':
      return { ...state, theme: action.theme };
    case 'apply-inputs':
      return {
        ...state,
        snapshot: updateDesignInputs(state.snapshot, action.patch),
        saved: false,
      };
    case 'save-version':
      return {
        ...state,
        snapshot: {
          ...state.snapshot,
          version: 'v05 · guardado local',
        },
        saved: true,
      };
    default:
      return state;
  }
}

