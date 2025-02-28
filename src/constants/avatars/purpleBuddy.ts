import { AvatarStyle } from './types';

export const purpleBuddy: AvatarStyle = {
  id: 'purple-buddy',
  name: 'Purple Buddy',
  variations: [
    {
      name: 'Happy',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#4F46E5"/>
        <circle cx="50" cy="50" r="35" fill="#818CF8"/>
        <circle cx="35" cy="45" r="5" fill="#fff"/>
        <circle cx="65" cy="45" r="5" fill="#fff"/>
        <path d="M35,65 Q50,75 65,65" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: 'Sad',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#4F46E5"/>
        <circle cx="50" cy="50" r="35" fill="#818CF8"/>
        <circle cx="35" cy="45" r="5" fill="#fff"/>
        <circle cx="65" cy="45" r="5" fill="#fff"/>
        <path d="M35,70 Q50,60 65,70" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: 'Mad',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#4F46E5"/>
        <circle cx="50" cy="50" r="35" fill="#818CF8"/>
        <circle cx="35" cy="45" r="5" fill="#fff"/>
        <circle cx="65" cy="45" r="5" fill="#fff"/>
        <path d="M35,65 L65,65" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        <path d="M30,35 L40,40" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
        <path d="M70,35 L60,40" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: 'Surprised',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#4F46E5"/>
        <circle cx="50" cy="50" r="35" fill="#818CF8"/>
        <circle cx="35" cy="45" r="5" fill="#fff"/>
        <circle cx="65" cy="45" r="5" fill="#fff"/>
        <circle cx="50" cy="65" r="8" fill="none" stroke="#fff" stroke-width="3"/>
      </svg>`
    }
  ]
};
