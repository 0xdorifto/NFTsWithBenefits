import { AvatarStyle } from './types';

export const pinkDegen: AvatarStyle = {
  id: 'pink-degen',
  name: 'Pink Degen',
  variations: [
    {
      name: 'Happy',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="faceGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:#FC8BBE"/>
            <stop offset="100%" style="stop-color:#F472B6"/>
          </radialGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100" height="100" fill="#DB2777"/>
        <circle cx="50" cy="50" r="35" fill="url(#faceGradient)" filter="url(#softShadow)"/>
        <circle cx="35" cy="45" r="6" fill="white" filter="url(#softShadow)"/>
        <circle cx="65" cy="45" r="6" fill="white" filter="url(#softShadow)"/>
        <circle cx="35" cy="45" r="2.5" fill="#000"/>
        <circle cx="65" cy="45" r="2.5" fill="#000"/>
        <path d="M40,65 Q50,75 60,65" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <path d="M32,39 Q35,36 38,39" stroke="#DB2777" stroke-width="1.5" fill="none"/>
        <path d="M62,39 Q65,36 68,39" stroke="#DB2777" stroke-width="1.5" fill="none"/>
        <path d="M28,30 Q35,25 42,30" stroke="#fff" stroke-width="1" stroke-opacity="0.6" fill="none"/>
        <path d="M58,30 Q65,25 72,30" stroke="#fff" stroke-width="1" stroke-opacity="0.6" fill="none"/>
      </svg>`
    },
    {
      name: 'Sad',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="faceGradientSad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:#FC8BBE"/>
            <stop offset="100%" style="stop-color:#F472B6"/>
          </radialGradient>
          <filter id="softShadowSad" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="tearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FFFFFF; stop-opacity:0.7"/>
            <stop offset="100%" style="stop-color:#A1CFFF; stop-opacity:0.9"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="#DB2777"/>
        <circle cx="50" cy="50" r="35" fill="url(#faceGradientSad)" filter="url(#softShadowSad)"/>
        <circle cx="35" cy="45" r="6" fill="white" filter="url(#softShadowSad)"/>
        <circle cx="65" cy="45" r="6" fill="white" filter="url(#softShadowSad)"/>
        <circle cx="35" cy="45" r="2.5" fill="#000"/>
        <circle cx="65" cy="45" r="2.5" fill="#000"/>
        <path d="M40,70 Q50,60 60,70" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <path d="M38,39 Q35,41 32,39" stroke="#DB2777" stroke-width="1.5" fill="none"/>
        <path d="M68,39 Q65,41 62,39" stroke="#DB2777" stroke-width="1.5" fill="none"/>
        <path d="M37,55 L35,65" stroke="url(#tearGradient)" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M63,55 L65,65" stroke="url(#tearGradient)" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: 'Bullish',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="faceGradientBull" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:#FC8BBE"/>
            <stop offset="100%" style="stop-color:#F472B6"/>
          </radialGradient>
          <filter id="softShadowBull" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="chartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style="stop-color:#10B981; stop-opacity:0.5"/>
            <stop offset="100%" style="stop-color:#10B981; stop-opacity:1"/>
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100" height="100" fill="#DB2777"/>
        <circle cx="50" cy="50" r="35" fill="url(#faceGradientBull)" filter="url(#softShadowBull)"/>
        <circle cx="35" cy="45" r="6" fill="white" filter="url(#softShadowBull)"/>
        <circle cx="65" cy="45" r="6" fill="white" filter="url(#softShadowBull)"/>
        <circle cx="35" cy="45" r="2.5" fill="#000"/>
        <circle cx="65" cy="45" r="2.5" fill="#000"/>
        <path d="M30,60 L40,45 L50,65 L60,35 L70,55" fill="none" stroke="url(#chartGradient)" stroke-width="3" stroke-linecap="round" filter="url(#glowEffect)"/>
        <path d="M40,65 Q50,70 60,65" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="70" cy="55" r="2.5" fill="#5EEAD4" filter="url(#glowEffect)"/>
        <path d="M35,38 Q35,35 38,35" stroke="#000" stroke-width="1" fill="none"/>
        <path d="M65,38 Q65,35 68,35" stroke="#000" stroke-width="1" fill="none"/>
      </svg>`
    },
    {
      name: 'Bearish',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="faceGradientBear" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:#FC8BBE"/>
            <stop offset="100%" style="stop-color:#F472B6"/>
          </radialGradient>
          <filter id="softShadowBear" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="chartGradientRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#EF4444; stop-opacity:1"/>
            <stop offset="100%" style="stop-color:#EF4444; stop-opacity:0.5"/>
          </linearGradient>
          <filter id="glowEffectRed" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100" height="100" fill="#DB2777"/>
        <circle cx="50" cy="50" r="35" fill="url(#faceGradientBear)" filter="url(#softShadowBear)"/>
        <circle cx="35" cy="45" r="6" fill="white" filter="url(#softShadowBear)"/>
        <circle cx="65" cy="45" r="6" fill="white" filter="url(#softShadowBear)"/>
        <circle cx="35" cy="45" r="2.5" fill="#000"/>
        <circle cx="65" cy="45" r="2.5" fill="#000"/>
        <path d="M30,40 L40,55 L50,35 L60,65 L70,45" fill="none" stroke="url(#chartGradientRed)" stroke-width="3" stroke-linecap="round" filter="url(#glowEffectRed)"/>
        <path d="M40,65 Q50,60 60,65" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="70" cy="45" r="2.5" fill="#FCA5A5" filter="url(#glowEffectRed)"/>
        <path d="M30,39 Q35,35 40,39" stroke="#DB2777" stroke-width="1.5" fill="none"/>
        <path d="M60,39 Q65,35 70,39" stroke="#DB2777" stroke-width="1.5" fill="none"/>
        <line x1="30" y1="30" x2="40" y2="33" stroke="#DB2777" stroke-width="1.5"/>
        <line x1="60" y1="33" x2="70" y2="30" stroke="#DB2777" stroke-width="1.5"/>
      </svg>`
    }
  ]
};
