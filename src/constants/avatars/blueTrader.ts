import { AvatarStyle } from './types';

export const blueTrader: AvatarStyle = {
  id: 'blue-trader',
  name: 'Blue Trader',
  variations: [
    {
      name: 'Happy',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#2563EB"/>
        <circle cx="50" cy="50" r="35" fill="#60A5FA"/>
        <path d="M35,40 Q40,35 45,40" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M55,40 Q60,35 65,40" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M40,60 Q50,70 60,60" fill="none" stroke="#fff" stroke-width="3"/>
      </svg>`
    },
    {
      name: 'Sad',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#2563EB"/>
        <circle cx="50" cy="50" r="35" fill="#60A5FA"/>
        <path d="M35,40 Q40,35 45,40" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M55,40 Q60,35 65,40" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M40,65 Q50,55 60,65" fill="none" stroke="#fff" stroke-width="3"/>
      </svg>`
    },
    {
      name: 'NGMI',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#2563EB"/>
        <circle cx="50" cy="50" r="35" fill="#60A5FA"/>
        <path d="M35,35 L45,45 M35,45 L45,35" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        <path d="M55,35 L65,45 M55,45 L65,35" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        <path d="M30,70 Q50,50 70,70" fill="none" stroke="#fff" stroke-width="3"/>
      </svg>`
    },
    {
      name: 'Wen Moon',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#2563EB"/>
        <circle cx="50" cy="50" r="35" fill="#60A5FA"/>
        <circle cx="35" cy="40" r="6" fill="#fff"/>
        <circle cx="65" cy="40" r="6" fill="#fff"/>
        <circle cx="35" cy="40" r="2" fill="#2563EB"/>
        <circle cx="65" cy="40" r="2" fill="#2563EB"/>
        <path d="M35,60 L45,65 L55,65 L65,60" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        <circle cx="75" cy="20" r="8" fill="#FBBF24"/>
      </svg>`
    }
  ]
};
