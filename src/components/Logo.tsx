import { FC } from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Animated glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-200 animate-pulse"></div>
        
        {/* Logo SVG */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
        >
          <path
            d="M20 5L5 13V29L20 37L35 29V13L20 5Z"
            className="stroke-purple-500"
            strokeWidth="2"
            fill="url(#gradient)"
          />
          <path
            d="M20 5V21M20 21L35 13M20 21L5 13"
            className="stroke-blue-400"
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="21"
            r="3"
            className="fill-purple-500"
          />
          <defs>
            <linearGradient id="gradient" x1="5" y1="5" x2="35" y2="37" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F46E5" stopOpacity="0.2" />
              <stop offset="1" stopColor="#0EA5E9" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            NFTs With Benefits
          </span>
        </div>
      )}
    </div>
  );
};
