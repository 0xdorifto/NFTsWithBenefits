import { AvatarStyle } from './types';

export const redDegen: AvatarStyle = {
  id: 'red-degen',
  name: 'Red Degen',
  variations: [
    {
      name: 'Mad',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#DC2626"/>
        <circle cx="50" cy="50" r="35" fill="#FCA5A5"/>
        <path d="M35,40 L45,50 M45,40 L35,50" stroke="#fff" stroke-width="3"/>
        <path d="M55,40 L65,50 M65,40 L55,50" stroke="#fff" stroke-width="3"/>
        <path d="M40,70 Q50,60 60,70" fill="none" stroke="#fff" stroke-width="3"/>
      </svg>`
    },
  ]
}
