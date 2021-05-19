import stc from 'string-to-color';
import { getColor } from 'tailwind-rn';
import tinycolor from 'tinycolor2';

export function colorFromString (str: string, opacity: number = 1) {
  return tinycolor(stc(str)).setAlpha(opacity);
}

export function getStyleColors (str: string) {
  return {backgroundColor: colorFromString(str).toHexString(), color: colorFromString(str).isLight() ? '#000000' : '#FFFFFF'}
}

export const ratingColours = [
  "green-600",
  "yellow-600",
  "red-600",
];

export const ratingColorsHex = ratingColours.map((c) => getColor(c));

export function getRatingColor (rating: number, type: 'bg' | 'text' = 'bg', colourType: 'tw' | 'hex' = 'tw') {
  const colours = colourType === 'tw' ? ratingColours : ratingColorsHex;
  return `${type}-${rating < 3 ? colours[2] : rating < 7 ? colours[1] : colours[0]}`;
}
