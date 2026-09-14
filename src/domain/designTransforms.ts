import type {
  DesignInput,
  DesignInputPatch,
  DesignSnapshot,
} from './design';
import { createDemoDesign } from './demoDesign';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const round = (value: number, decimals = 1) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

function calculateResults(inputs: DesignInput): DesignSnapshot['results'] {
  const { spanM, depthMm, loadKnm, concreteMpa } = inputs;
  const momentKnm = round((loadKnm * spanM ** 2) / 8 + 2.4);
  const shearKn = round((loadKnm * spanM) / 2);
  const deflectionMm = round(
    16.8 *
      (loadKnm / 25) *
      (spanM / 6) ** 4 *
      (600 / Math.max(depthMm, 180)) ** 3 *
      (25 / Math.max(concreteMpa, 15)) ** 0.2,
  );
  const longitudinalSteelMm2 = Math.max(980, Math.round(momentKnm * 39.37));
  const stirrupSpacingMm = clamp(
    Math.round((depthMm / 4) * (25 / Math.max(loadKnm, 1)) ** 0.25 / 10) * 10,
    100,
    250,
  );

  return {
    momentKnm,
    shearKn,
    deflectionMm,
    longitudinalSteelMm2,
    stirrupSpacingMm,
    stirrupDiameterMm: depthMm >= 450 ? 10 : 8,
    longitudinalBars: longitudinalSteelMm2 > 3600 ? '4Ø25' : longitudinalSteelMm2 > 1800 ? '4Ø20' : '3Ø16',
  };
}

export function updateDesignInputs(
  snapshot: DesignSnapshot,
  patch: DesignInputPatch,
): DesignSnapshot {
  const inputs: DesignInput = {
    ...snapshot.inputs,
    ...patch,
    spanM: clamp(Number(patch.spanM ?? snapshot.inputs.spanM), 1, 24),
    widthMm: clamp(Number(patch.widthMm ?? snapshot.inputs.widthMm), 150, 1200),
    depthMm: clamp(Number(patch.depthMm ?? snapshot.inputs.depthMm), 180, 1800),
    concreteMpa: clamp(Number(patch.concreteMpa ?? snapshot.inputs.concreteMpa), 15, 80),
    loadKnm: clamp(Number(patch.loadKnm ?? snapshot.inputs.loadKnm), 0, 250),
    coverMm: clamp(Number(patch.coverMm ?? snapshot.inputs.coverMm), 20, 90),
  };

  return {
    ...snapshot,
    inputs,
    results: calculateResults(inputs),
    version: 'borrador · cambios sin guardar',
  };
}

export function getActiveCheck(snapshot: DesignSnapshot, id: string) {
  return snapshot.checks.find((check) => check.id === id);
}

export function createUpdatedDemoDesign(patch: DesignInputPatch) {
  return updateDesignInputs(createDemoDesign(), patch);
}

