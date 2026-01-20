'use client';

import React from 'react';
import ClassicBorder from './ClassicBorder';
import PaisleyBorder from './PaisleyBorder';
import MandalaBorder from './MandalaBorder';
import PeacockBorder from './PeacockBorder';
import ArtDecoBorder from './ArtDecoBorder';

interface BorderRendererProps {
  borderId: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function BorderRenderer({
  borderId,
  primaryColor,
  secondaryColor,
}: BorderRendererProps) {
  switch (borderId) {
    case 'paisley':
      return <PaisleyBorder primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case 'mandala':
      return <MandalaBorder primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case 'peacock':
      return <PeacockBorder primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case 'artdeco':
      return <ArtDecoBorder primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case 'classic':
    default:
      return <ClassicBorder primaryColor={primaryColor} secondaryColor={secondaryColor} />;
  }
}

export { ClassicBorder, PaisleyBorder, MandalaBorder, PeacockBorder, ArtDecoBorder };
