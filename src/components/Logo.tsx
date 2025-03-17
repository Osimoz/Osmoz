import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8 w-auto", color = "#862637" }) => {
  return (
    <img 
      src="/images/osmoz-logo.png" 
      alt="OSMOZ" 
      className={className} 
      style={{ filter: `brightness(0) saturate(100%) invert(19%) sepia(27%) saturate(2202%) hue-rotate(311deg) brightness(90%) contrast(95%)` }}
    />
  );
}

export const LogoHorizontal: React.FC<LogoProps> = ({ className, color = "#862637" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/images/osmoz-logo.png" 
        alt="OSMOZ" 
        className="h-8 w-auto" 
        style={{ filter: `brightness(0) saturate(100%) invert(19%) sepia(27%) saturate(2202%) hue-rotate(311deg) brightness(90%) contrast(95%)` }}
      />
    </div>
  );
}

export default Logo;