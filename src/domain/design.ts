export type ProductStatus = 'available' | 'experimental' | 'review' | 'planned';

export type DesignView = 'model' | 'results' | 'design' | 'evidence';

export type ThemeMode = 'day' | 'night';

export type ResultSignal =
  | 'moment'
  | 'shear'
  | 'deflection'
  | 'longitudinalSteel'
  | 'stirrups';

export type DesignInput = {
  spanM: number;
  widthMm: number;
  depthMm: number;
  concreteMpa: number;
  loadKnm: number;
  coverMm: number;
};

export type DesignResults = {
  momentKnm: number;
  shearKn: number;
  deflectionMm: number;
  longitudinalSteelMm2: number;
  stirrupSpacingMm: number;
  stirrupDiameterMm: number;
  longitudinalBars: string;
};

export type DesignReference = {
  code: string;
  edition: string;
  clause: string;
  sourceUrl: string;
};

export type DesignCheck = {
  id: string;
  label: string;
  state: ProductStatus;
  ratio?: number;
  unit?: string;
  reference: DesignReference;
  assumptions: string[];
  detail: string;
};

export type DesignSnapshot = {
  projectId: string;
  projectName: string;
  status: ProductStatus;
  version: string;
  code: DesignReference & { id: 'ntc-cdmx-2017' };
  member: {
    id: string;
    label: string;
    type: 'beam';
    material: 'reinforced-concrete';
  };
  inputs: DesignInput;
  results: DesignResults;
  checks: DesignCheck[];
};

export type DesignInputPatch = Partial<DesignInput>;

