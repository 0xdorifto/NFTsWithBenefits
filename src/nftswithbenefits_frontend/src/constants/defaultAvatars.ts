export const DEFAULT_AVATARS = [
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#4F46E5"/>
    <circle cx="50" cy="50" r="35" fill="#818CF8"/>
    <circle cx="35" cy="45" r="5" fill="#fff"/>
    <circle cx="65" cy="45" r="5" fill="#fff"/>
    <path d="M35,65 Q50,75 65,65" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#7C3AED"/>
    <circle cx="50" cy="50" r="35" fill="#A78BFA"/>
    <path d="M30,45 L40,45" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <path d="M60,45 L70,45" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <circle cx="50" cy="65" r="5" fill="#fff"/>
  </svg>`,

  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#2563EB"/>
    <circle cx="50" cy="50" r="35" fill="#60A5FA"/>
    <path d="M35,40 Q40,35 45,40" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M55,40 Q60,35 65,40" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M40,60 Q50,70 60,60" fill="none" stroke="#fff" stroke-width="3"/>
  </svg>`,

  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#DB2777"/>
    <circle cx="50" cy="50" r="35" fill="#F472B6"/>
    <circle cx="35" cy="45" r="6" fill="#fff"/>
    <circle cx="65" cy="45" r="6" fill="#fff"/>
    <circle cx="35" cy="45" r="2" fill="#000"/>
    <circle cx="65" cy="45" r="2" fill="#000"/>
    <path d="M40,65 Q50,60 60,65" fill="none" stroke="#fff" stroke-width="3"/>
  </svg>`,

  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#9333EA"/>
    <circle cx="50" cy="50" r="35" fill="#C084FC"/>
    <path d="M30,45 L40,40 L30,35" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M70,45 L60,40 L70,35" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M35,65 Q50,75 65,65" fill="none" stroke="#fff" stroke-width="3"/>
  </svg>`,

  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#059669"/>
    <circle cx="50" cy="50" r="35" fill="#34D399"/>
    <circle cx="35" cy="45" r="5" fill="#fff"/>
    <circle cx="65" cy="45" r="5" fill="#fff"/>
    <path d="M35,65 Q50,55 65,65" fill="none" stroke="#fff" stroke-width="3"/>
  </svg>`,

  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#DC2626"/>
    <circle cx="50" cy="50" r="35" fill="#FCA5A5"/>
    <path d="M35,40 L45,50 M45,40 L35,50" stroke="#fff" stroke-width="3"/>
    <path d="M55,40 L65,50 M65,40 L55,50" stroke="#fff" stroke-width="3"/>
    <path d="M40,70 Q50,60 60,70" fill="none" stroke="#fff" stroke-width="3"/>
  </svg>`,

  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#0891B2"/>
    <circle cx="50" cy="50" r="35" fill="#22D3EE"/>
    <circle cx="35" cy="45" r="8" fill="#fff"/>
    <circle cx="65" cy="45" r="8" fill="#fff"/>
    <circle cx="35" cy="45" r="3" fill="#000"/>
    <circle cx="65" cy="45" r="3" fill="#000"/>
    <path d="M35,65 Q50,80 65,65" fill="none" stroke="#fff" stroke-width="3"/>
  </svg>`,

  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#4338CA"/>
    <circle cx="50" cy="50" r="35" fill="#818CF8"/>
    <path d="M30,45 Q35,35 40,45" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M60,45 Q65,35 70,45" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M40,65 Q50,75 60,65" fill="none" stroke="#fff" stroke-width="3"/>
  </svg>`,

  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#B45309"/>
    <circle cx="50" cy="50" r="35" fill="#FCD34D"/>
    <path d="M30,40 L40,45 L30,50" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M70,40 L60,45 L70,50" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M35,65 Q50,70 65,65" fill="none" stroke="#fff" stroke-width="3"/>
  </svg>`
];

export const getRandomAvatar = (): string => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_AVATARS.length);
  return `data:image/svg+xml,${encodeURIComponent(DEFAULT_AVATARS[randomIndex])}`;
};
