import { AvatarStyle } from './types';

export const greenDegen: AvatarStyle = {
  id: 'green-degen',
  name: 'Green Degen',
  variations: [
    {
      name: 'Happy',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#059669"/>
        <circle cx="50" cy="50" r="35" fill="#34D399"/>
        <circle cx="35" cy="45" r="5" fill="#fff"/>
        <circle cx="65" cy="45" r="5" fill="#fff"/>
        <path d="M35,65 Q50,75 65,65" fill="none" stroke="#fff" stroke-width="3"/>
      </svg>`
    },
    {
      name: 'Rich',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#059669"/>
        <circle cx="50" cy="50" r="35" fill="#34D399"/>
        <circle cx="35" cy="45" r="5" fill="#fff"/>
        <circle cx="65" cy="45" r="5" fill="#fff"/>
        <path d="M35,65 Q50,75 65,65" fill="none" stroke="#fff" stroke-width="3"/>
        <circle cx="35" cy="45" r="2" fill="#059669"/>
        <circle cx="65" cy="45" r="2" fill="#059669"/>
        <path d="M20,30 L25,20 L30,30" stroke="#FBBF24" stroke-width="2" fill="none"/>
        <path d="M25,20 L25,35" stroke="#FBBF24" stroke-width="2"/>
        <path d="M70,30 L75,20 L80,30" stroke="#FBBF24" stroke-width="2" fill="none"/>
        <path d="M75,20 L75,35" stroke="#FBBF24" stroke-width="2"/>
      </svg>`
    },
    {
      name: 'Lambo Soon',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#059669"/>
        <circle cx="50" cy="50" r="35" fill="#34D399"/>
        <circle cx="35" cy="45" r="5" fill="#fff"/>
        <circle cx="65" cy="45" r="5" fill="#fff"/>
        <path d="M35,65 Q50,75 65,65" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M15,80 L25,80 L30,75 L70,75 L75,80 L85,80" stroke="#FBBF24" stroke-width="2" fill="none"/>
        <circle cx="30" cy="85" r="5" fill="#FBBF24"/>
        <circle cx="70" cy="85" r="5" fill="#FBBF24"/>
      </svg>`
    },
    {
      name: 'Poor',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#059669"/>
        <circle cx="50" cy="50" r="35" fill="#34D399"/>
        <path d="M35,45 L30,40 M40,45 L35,40" stroke="#fff" stroke-width="2"/>
        <path d="M60,45 L65,40 M65,45 L70,40" stroke="#fff" stroke-width="2"/>
        <path d="M35,65 Q50,55 65,65" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M40,25 Q50,20 60,25" stroke="#fff" stroke-width="2" fill="none"/>
        <path d="M40,25 L35,15 M60,25 L65,15" stroke="#fff" stroke-width="2" fill="none"/>
      </svg>`
    }
  ]
};
