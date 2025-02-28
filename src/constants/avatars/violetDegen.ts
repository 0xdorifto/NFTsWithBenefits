import { AvatarStyle } from './types';

export const violetDegen: AvatarStyle = {
  id: 'violet-degen',
  name: 'Violet Degen',
  variations: [
    {
      name: 'Happy',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#7C3AED"/>
        <circle cx="50" cy="50" r="35" fill="#A78BFA"/>
        <path d="M30,45 L40,45" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M60,45 L70,45" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M35,65 Q50,75 65,65" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: 'Sad',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#7C3AED"/>
        <circle cx="50" cy="50" r="35" fill="#A78BFA"/>
        <path d="M30,45 L40,45" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M60,45 L70,45" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M35,70 Q50,60 65,70" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: 'Mad',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#7C3AED"/>
        <circle cx="50" cy="50" r="35" fill="#A78BFA"/>
        <path d="M25,40 L40,50" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M75,40 L60,50" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M35,70 L65,70" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: 'LOL',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#7C3AED"/>
        <circle cx="50" cy="50" r="35" fill="#A78BFA"/>
        <path d="M30,35 L35,45 L40,35" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M60,35 L65,45 L70,35" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M30,65 Q50,80 70,65" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      </svg>`
    }
  ]
};
