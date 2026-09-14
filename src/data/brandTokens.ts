export const brandTokens = {
  brand: '#1AA57A',
  familyAnalysis: '#ED4B46',
  surfaces: {
    day: {
      paper: '#F7F6F1',
      surface: '#FFFEFA',
      sunken: '#EDEFE9',
      line: '#DDE2DC',
      lineStrong: '#A7B1A9',
      ink: '#14171A',
      muted: '#5C6A6F',
    },
    night: {
      paper: '#0E1113',
      surface: '#1B1F22',
      sunken: '#14171A',
      line: '#333A3E',
      lineStrong: '#465055',
      ink: '#F2F4F3',
      muted: '#B4BDC0',
    },
  },
  signals: {
    axial: '#63C5FF',
    moment: '#FF8E80',
    shear: '#55C990',
    deflection: '#9B87FF',
    attention: '#F3C553',
    steel: '#EF7AB9',
  },
  spacing: [4, 8, 12, 16, 24, 32, 48, 64],
  radii: { sm: 10, md: 18, lg: 28, pill: 999 },
  motion: { quick: 180, base: 360, slow: 720 },
} as const;

export type SignalToken = keyof typeof brandTokens.signals;

