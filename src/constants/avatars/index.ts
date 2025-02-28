import { AvatarStyle } from './types';
import { purpleBuddy } from './purpleBuddy';
import { violetDegen } from './violetDegen';
import { pinkDegen } from './pinkDegen';
import { cryptoWizard } from './cryptoWizard';
import { greenDegen } from './greenDegen';
import { redDegen } from './redDegen';
import { blueTrader } from './blueTrader';

export const DEFAULT_AVATARS: AvatarStyle[] = [
  purpleBuddy,
  violetDegen,
  pinkDegen,
  cryptoWizard,
  greenDegen,
  redDegen,
  blueTrader
];

export interface AvatarChoice {
  id: string;
  name: string;
  style: string;
  variation: string;
  svgData: string;
  dataUrl: string;
}

export const getRandomAvatar = (): AvatarChoice => {
  const randomStyleIndex = Math.floor(Math.random() * DEFAULT_AVATARS.length);
  const selectedStyle = DEFAULT_AVATARS[randomStyleIndex];
  
  const randomVariationIndex = Math.floor(Math.random() * selectedStyle.variations.length);
  const selectedVariation = selectedStyle.variations[randomVariationIndex];
  
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(selectedVariation.svg)}`;
  
  return {
    id: `${selectedStyle.id}-${randomVariationIndex}`,
    name: `${selectedStyle.name} (${selectedVariation.name})`,
    style: selectedStyle.id,
    variation: selectedVariation.name,
    svgData: selectedVariation.svg,
    dataUrl: dataUrl
  };
};

export const getAvatarByStyleAndVariation = (styleId: string, variationName: string): AvatarChoice | null => {
  const style = DEFAULT_AVATARS.find(s => s.id === styleId);
  if (!style) return null;
  
  const variation = style.variations.find(v => v.name === variationName);
  if (!variation) return null;
  
  return {
    id: `${style.id}-${variationName}`,
    name: `${style.name} (${variation.name})`,
    style: style.id,
    variation: variation.name,
    svgData: variation.svg,
    dataUrl: `data:image/svg+xml,${encodeURIComponent(variation.svg)}`
  };
};

export const getAllAvatars = (): AvatarChoice[] => {
  const allAvatars: AvatarChoice[] = [];
  
  DEFAULT_AVATARS.forEach(style => {
    style.variations.forEach(variation => {
      allAvatars.push({
        id: `${style.id}-${variation.name}`,
        name: `${style.name} (${variation.name})`,
        style: style.id,
        variation: variation.name,
        svgData: variation.svg,
        dataUrl: `data:image/svg+xml,${encodeURIComponent(variation.svg)}`
      });
    });
  });
  
  return allAvatars;
};

// Re-export the types
export * from './types';
