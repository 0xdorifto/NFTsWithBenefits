import { AvatarStyle } from './types';

export const cryptoWizard: AvatarStyle = {
  id: 'crypto-wizard',
  name: 'Crypto Wizard',
  variations: [
    {
      name: 'Happy',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#9333EA"/>
        <circle cx="50" cy="50" r="35" fill="#C084FC"/>
        <path d="M30,45 L40,40 L30,35" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M70,45 L60,40 L70,35" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M35,65 Q50,75 65,65" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M30,20 L50,5 L70,20" fill="none" stroke="#FBBF24" stroke-width="2"/>
        <path d="M50,5 L50,15" fill="none" stroke="#FBBF24" stroke-width="2"/>
      </svg>`
    },
    {
      name: 'Rekt',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#9333EA"/>
        <circle cx="50" cy="50" r="35" fill="#C084FC"/>
        <path d="M35,40 L45,50 M35,50 L45,40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        <path d="M55,40 L65,50 M55,50 L65,40" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        <path d="M35,70 Q50,60 65,70" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M30,20 L50,5 L70,20" fill="none" stroke="#FBBF24" stroke-width="2"/>
        <path d="M50,5 L50,15" fill="none" stroke="#FBBF24" stroke-width="2"/>
      </svg>`
    },
    {
      name: 'Minting',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#9333EA"/>
        <circle cx="50" cy="50" r="35" fill="#C084FC"/>
        <path d="M30,45 L40,40 L30,35" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M70,45 L60,40 L70,35" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M35,63 Q40,68 50,63 Q60,58 65,63" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M30,20 L50,5 L70,20" fill="none" stroke="#FBBF24" stroke-width="2"/>
        <path d="M50,5 L50,15" fill="none" stroke="#FBBF24" stroke-width="2"/>
        <circle cx="50" cy="85" r="10" fill="#34D399" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>`
    },
    {
      name: 'Diamond Hands',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#9333EA"/>
        <circle cx="50" cy="50" r="35" fill="#C084FC"/>
        <path d="M30,45 L40,40 L30,35" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M70,45 L60,40 L70,35" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M35,65 Q50,75 65,65" fill="none" stroke="#fff" stroke-width="3"/>
        <path d="M30,20 L50,5 L70,20" fill="none" stroke="#FBBF24" stroke-width="2"/>
        <path d="M50,5 L50,15" fill="none" stroke="#FBBF24" stroke-width="2"/>
        <path d="M25,75 L35,85 L45,75 L35,95 L25,75" fill="#A5F3FC" stroke="#0EA5E9" stroke-width="1"/>
        <path d="M75,75 L65,85 L55,75 L65,95 L75,75" fill="#A5F3FC" stroke="#0EA5E9" stroke-width="1"/>
      </svg>`
    }
  ]
};
