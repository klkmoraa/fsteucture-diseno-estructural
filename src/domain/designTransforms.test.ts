import { describe, expect, it } from 'vitest';
import { createDemoDesign } from './demoDesign';
import { getActiveCheck, updateDesignInputs } from './designTransforms';

describe('design snapshot transforms', () => {
  it('creates an explicit metric, experimental starting case', () => {
    const snapshot = createDemoDesign();

    expect(snapshot.code.id).toBe('ntc-cdmx-2017');
    expect(snapshot.inputs).toMatchObject({
      spanM: 6,
      widthMm: 300,
      depthMm: 600,
      concreteMpa: 25,
      loadKnm: 25,
      coverMm: 40,
    });
    expect(snapshot.results.shearKn).toBe(75);
    expect(snapshot.results.momentKnm).toBe(114.9);
    expect(snapshot.status).toBe('experimental');
  });

  it('recalculates moment, shear, deflection and reinforcement after a load update', () => {
    const snapshot = createDemoDesign();
    const updated = updateDesignInputs(snapshot, { loadKnm: 16 });

    expect(updated.results.momentKnm).toBeLessThan(snapshot.results.momentKnm);
    expect(updated.results.shearKn).toBe(48);
    expect(updated.results.deflectionMm).toBeLessThan(snapshot.results.deflectionMm);
    expect(updated.results.stirrupSpacingMm).toBeGreaterThanOrEqual(150);
    expect(updated.code).toEqual(snapshot.code);
    expect(updated).not.toBe(snapshot);
  });

  it('keeps the minimum stirrup spacing bounded and preserves the evidence target', () => {
    const snapshot = createDemoDesign();
    const updated = updateDesignInputs(snapshot, {
      depthMm: 180,
      loadKnm: 60,
    });
    const check = getActiveCheck(updated, 'flexion');

    expect(updated.results.stirrupSpacingMm).toBeGreaterThanOrEqual(100);
    expect(updated.results.stirrupSpacingMm).toBeLessThanOrEqual(250);
    expect(check?.reference.clause).toBe('4.2.2');
    expect(check?.assumptions.length).toBeGreaterThan(0);
  });
});
