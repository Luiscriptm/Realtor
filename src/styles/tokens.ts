export const colors = {
  cream: '#F5EEDD',
  creamDeep: '#EDE3CB',
  paper: '#FBF7EC',
  ink: '#1F2E24',
  inkSoft: '#3D4A3F',
  muted: '#7A756A',
  line: '#E3DBC5',
  forest: '#2F4A37',
  forestDeep: '#1F3127',
  terra: '#B5643C',
  terraSoft: '#E8D3C2',
  sage: '#8AA58C',
  warn: '#A84433',
  ambar: '#C89B3D',
} as const;

export const SERIF = "'Instrument Serif', 'Times New Roman', serif";
export const SANS = "'Manrope', system-ui, sans-serif";

export const fontFamilies = {
  serif: ['Instrument Serif', 'Times New Roman', 'serif'],
  sans: ['Manrope', 'system-ui', 'sans-serif'],
} as const;

export type ColorToken = keyof typeof colors;
