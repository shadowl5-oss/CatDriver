import React from 'react';

interface CatLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const CatLogo: React.FC<CatLogoProps> = ({ className = "", width = 40, height = 40 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Black cat silhouette */}
      <path 
        d="M150 40C122 40 100 55 85 75C70 95 65 125 65 150C65 175 70 200 85 220C100 240 122 260 150 260C178 260 200 240 215 220C230 200 235 175 235 150C235 125 230 95 215 75C200 55 178 40 150 40Z" 
        fill="currentColor" 
      />
      {/* Cat ears */}
      <path 
        d="M95 70C85 50 75 40 65 50C55 60 60 75 70 85C80 95 90 90 95 70Z" 
        fill="currentColor" 
      />
      <path 
        d="M205 70C215 50 225 40 235 50C245 60 240 75 230 85C220 95 210 90 205 70Z" 
        fill="currentColor" 
      />
      {/* Cat eyes */}
      <ellipse cx="110" cy="120" rx="15" ry="20" fill="white" />
      <ellipse cx="190" cy="120" rx="15" ry="20" fill="white" />
      <ellipse cx="110" cy="120" rx="5" ry="10" fill="black" />
      <ellipse cx="190" cy="120" rx="5" ry="10" fill="black" />
      {/* Whiskers */}
      <line x1="70" y1="150" x2="105" y2="150" stroke="white" strokeWidth="2" />
      <line x1="70" y1="160" x2="105" y2="160" stroke="white" strokeWidth="2" />
      <line x1="70" y1="170" x2="105" y2="170" stroke="white" strokeWidth="2" />
      <line x1="230" y1="150" x2="195" y2="150" stroke="white" strokeWidth="2" />
      <line x1="230" y1="160" x2="195" y2="160" stroke="white" strokeWidth="2" />
      <line x1="230" y1="170" x2="195" y2="170" stroke="white" strokeWidth="2" />
      {/* Wifi/signal tail */}
      <path 
        d="M220 200C240 200 255 185 260 170" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round" 
        fill="none" 
      />
      <path 
        d="M225 180C245 180 260 165 265 150" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round" 
        fill="none" 
      />
      <path 
        d="M230 160C250 160 265 145 270 130" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round" 
        fill="none" 
      />
    </svg>
  );
};

export default CatLogo;