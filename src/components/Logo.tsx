import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8", color = "currentColor" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="6"/>
      <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="6"/>
      <circle cx="50" cy="85" r="3" fill={color}/>
    </svg>
  );
}

export const LogoHorizontal: React.FC<LogoProps> = ({ className, color = "currentColor" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Logo className="h-8 w-8" color={color} />
      <span 
        className="ml-2 tracking-[0.2em] uppercase text-lg font-medium" 
        style={{ 
          color,
          letterSpacing: '0.2em',
          fontFeatureSettings: "'ss01' on, 'liga' off",
          fontVariantCaps: 'all-small-caps'
        }}
      >
        Osmoz
      </span>
    </div>
  );
}

export default Logo;