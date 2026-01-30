export interface BorderDesign {
  id: string;
  name: string;
  nameMarathi: string;
  nameHindi?: string;
  description: string;
}

export const borderDesigns: BorderDesign[] = [
  {
    id: 'classic',
    name: 'Classic Double',
    nameMarathi: 'क्लासिक',
    nameHindi: 'क्लासिक',
    description: 'Simple elegant double border',
  },
  {
    id: 'paisley',
    name: 'Paisley',
    nameMarathi: 'पैसली',
    nameHindi: 'पैस्ले',
    description: 'Traditional Indian paisley pattern',
  },
  {
    id: 'mandala',
    name: 'Mandala',
    nameMarathi: 'मंडला',
    nameHindi: 'मंडला',
    description: 'Intricate mandala corners',
  },
  {
    id: 'peacock',
    name: 'Peacock',
    nameMarathi: 'मोर',
    nameHindi: 'मोर',
    description: 'Elegant peacock feather corners',
  },
  {
    id: 'artdeco',
    name: 'Art Deco',
    nameMarathi: 'आर्ट डेको',
    nameHindi: 'आर्ट डेको',
    description: 'Modern geometric pattern',
  },
];

export const defaultBorder = borderDesigns[0];

export function getBorderById(id: string): BorderDesign {
  return borderDesigns.find((b) => b.id === id) || defaultBorder;
}
