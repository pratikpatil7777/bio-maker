export interface Theme {
  id: string;
  name: string;
  nameMarathi: string;
  colors: {
    primary: string;      // Main accent (gold, rose, etc.)
    primaryDark: string;  // Darker shade
    secondary: string;    // Background accent
    background: string;   // Main background
    backgroundAlt: string; // Alternate background
    text: string;         // Main text
    textMuted: string;    // Muted text
    border: string;       // Border color
    headerText: string;   // Header/title color
  };
  preview: string[];  // Gradient colors for preview swatch
}

export const themes: Theme[] = [
  {
    id: 'gold',
    name: 'Royal Gold',
    nameMarathi: 'शाही सोनेरी',
    colors: {
      primary: '#D4AF37',
      primaryDark: '#B8860B',
      secondary: '#800020',
      background: '#FFFEF0',
      backgroundAlt: '#FFF9E6',
      text: '#333333',
      textMuted: '#555555',
      border: '#E8DFC4',
      headerText: '#800020',
    },
    preview: ['#D4AF37', '#B8860B'],
  },
  {
    id: 'rose',
    name: 'Rose Gold',
    nameMarathi: 'गुलाबी सोनेरी',
    colors: {
      primary: '#E8A598',
      primaryDark: '#D4847A',
      secondary: '#8B4557',
      background: '#FFF9F7',
      backgroundAlt: '#FFF0ED',
      text: '#333333',
      textMuted: '#666666',
      border: '#F0D5CF',
      headerText: '#8B4557',
    },
    preview: ['#E8A598', '#D4847A'],
  },
  {
    id: 'silver',
    name: 'Elegant Silver',
    nameMarathi: 'चांदी',
    colors: {
      primary: '#A8A8A8',
      primaryDark: '#808080',
      secondary: '#4A4A4A',
      background: '#FAFAFA',
      backgroundAlt: '#F5F5F5',
      text: '#333333',
      textMuted: '#666666',
      border: '#E0E0E0',
      headerText: '#4A4A4A',
    },
    preview: ['#A8A8A8', '#808080'],
  },
  {
    id: 'maroon',
    name: 'Royal Maroon',
    nameMarathi: 'शाही मरून',
    colors: {
      primary: '#800020',
      primaryDark: '#5C0018',
      secondary: '#D4AF37',
      background: '#FFFEF8',
      backgroundAlt: '#FFF8F0',
      text: '#333333',
      textMuted: '#555555',
      border: '#E8D8D0',
      headerText: '#800020',
    },
    preview: ['#800020', '#5C0018'],
  },
  {
    id: 'navy',
    name: 'Classic Navy',
    nameMarathi: 'नेव्ही निळा',
    colors: {
      primary: '#1E3A5F',
      primaryDark: '#152942',
      secondary: '#C9A962',
      background: '#F8FAFC',
      backgroundAlt: '#F1F5F9',
      text: '#1E293B',
      textMuted: '#475569',
      border: '#CBD5E1',
      headerText: '#1E3A5F',
    },
    preview: ['#1E3A5F', '#152942'],
  },
];

export const defaultTheme = themes[0];

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) || defaultTheme;
}
