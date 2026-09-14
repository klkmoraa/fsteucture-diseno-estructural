import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('design workbench UI', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('recalculates the beam response when a load is applied', async () => {
    const user = userEvent.setup();
    render(<App />);

    const loadField = screen.getByRole('spinbutton', { name: /Carga distribuida w/ });
    await user.clear(loadField);
    await user.type(loadField, '16');
    await user.click(screen.getByRole('button', { name: 'Aplicar cambios' }));

    expect(screen.getByText('48.0')).toBeInTheDocument();
    expect(screen.getByText('Cambios sin guardar')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /carga distribuida de 16\.0 kN\/m/i })).toBeInTheDocument();
  });

  it('switches to evidence and exposes the selected design check', async () => {
    const user = userEvent.setup();
    render(<App />);

    const topbar = screen.getByRole('navigation', { name: 'Superficies del proyecto' });
    await user.click(within(topbar).getByRole('button', { name: 'Evidencia' }));

    expect(screen.getByRole('heading', { name: 'Evidencia de diseño' })).toBeInTheDocument();
    expect(screen.getByText('Prototipo experimental · no certifica diseño')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Flexión en vigas de concreto reforzado/ })).toBeInTheDocument();
  });
});
