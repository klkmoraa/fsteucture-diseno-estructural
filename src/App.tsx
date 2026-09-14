import { useEffect, useReducer } from 'react';
import { appReducer, createInitialAppState } from './appState';
import { AppShell } from './components/AppShell';
import './styles/tokens.css';
import './styles/global.css';
import './styles/workbench.css';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, undefined, () => {
    const stored = window.localStorage.getItem('fstructure-design-workbench');
    if (!stored) return createInitialAppState();
    try {
      const parsed = JSON.parse(stored);
      return createInitialAppState(parsed.snapshot);
    } catch {
      return createInitialAppState();
    }
  });

  useEffect(() => {
    window.localStorage.setItem(
      'fstructure-design-workbench',
      JSON.stringify({ snapshot: state.snapshot }),
    );
  }, [state.snapshot]);

  return <AppShell state={state} dispatch={dispatch} />;
}
