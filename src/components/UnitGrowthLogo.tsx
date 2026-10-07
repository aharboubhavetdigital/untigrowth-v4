import React from 'react';

interface UnitGrowthLogoProps {
  variant?: 'exact' | 'horizontal' | 'stacked' | 'icon-only';
  theme?: 'dark' | 'light' | 'auto';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showText?: boolean;
}

const sizeMap: Record<string, string> = {
  xs: 'h-4',
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10',
  xl: 'h-12',
  '2xl': 'h-16',
};

export const UnitGrowthIcon: React.FC<{
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  size?: number | string;
}> = ({ className = 'h-8 w-auto', theme = 'auto' }) => {
  return (
    <img 
      src="/logo unit growth v2-01.png" 
      alt="UnitGrowth Icon" 
      className={`object-contain ${className}`}
    />
  );
};

export const UnitGrowthLogo: React.FC<UnitGrowthLogoProps> = ({
  variant = 'horizontal',
  theme = 'auto',
  size = 'md',
  className = '',
  showText = true,
}) => {
  const heightClass = sizeMap[size] || 'h-8';

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img 
        src="/logo unit growth v2-01.png" 
        alt="UnitGrowth Logo" 
        className={`${heightClass} w-auto object-contain`} 
      />
    </div>
  );
};

export default UnitGrowthLogo;
