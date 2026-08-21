import React from 'react';

interface UnitGrowthLogoProps {
  variant?: 'exact' | 'horizontal' | 'stacked' | 'icon-only';
  theme?: 'dark' | 'light' | 'auto';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showText?: boolean;
}

export const UnitGrowthIcon: React.FC<{
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  size?: number | string;
}> = ({ className = 'w-7 h-7', theme = 'auto' }) => {
  // In dark mode: White outer corner bracket + Vibrant Lime Green (#A8E635 / #9FD928) arrow (Exact match to uploaded image)
  // In light mode: Dark Slate outer corner bracket (#0F172A) + Rich Vibrant Lime/Forest Green (#65A30D) arrow
  const isLight = theme === 'light';

  const bracketStroke = isLight ? '#0F172A' : '#FFFFFF';
  const arrowColor = isLight ? '#65A30D' : '#A8E635';

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-colors duration-200 ${className}`}
      aria-label="UnitGrowth Official Icon"
    >
      {/* Outer corner line / bracket with inner curve - Exact geometry from official logo */}
      <path
        d="M 8 22 L 8 68 A 20 20 0 0 0 28 88 L 62 88"
        stroke={bracketStroke}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Upward diagonal growth arrow - 45 degree angle */}
      <path
        d="M 46 6 L 94 6 L 94 54 L 76 36 L 38 74 L 24 60 L 62 22 Z"
        fill={arrowColor}
      />
    </svg>
  );
};

export const UnitGrowthLogo: React.FC<UnitGrowthLogoProps> = ({
  variant = 'exact',
  theme = 'auto',
  size = 'md',
  className = '',
  showText = true,
}) => {
  const isLight = theme === 'light';

  // Sizing configurations matching design scales
  const sizeConfig = {
    xs: {
      icon: 'w-6 h-6',
      text: 'text-sm',
      stackedUnit: 'text-[11px] leading-[10px]',
      stackedGrowth: 'text-[12px] leading-[10px]',
      gap: 'gap-1.5',
    },
    sm: {
      icon: 'w-7 h-7 sm:w-8 sm:h-8',
      text: 'text-base sm:text-lg',
      stackedUnit: 'text-[12px] leading-[11px]',
      stackedGrowth: 'text-[14px] leading-[12px]',
      gap: 'gap-2',
    },
    md: {
      icon: 'w-10 h-10 sm:w-11 sm:h-11',
      text: 'text-xl sm:text-2xl',
      stackedUnit: 'text-[15px] leading-[13px]',
      stackedGrowth: 'text-[18px] leading-[16px]',
      gap: 'gap-2.5',
    },
    lg: {
      icon: 'w-13 h-13 sm:w-16 sm:h-16',
      text: 'text-3xl sm:text-4xl',
      stackedUnit: 'text-[20px] leading-[18px]',
      stackedGrowth: 'text-[24px] leading-[22px]',
      gap: 'gap-3',
    },
    xl: {
      icon: 'w-16 h-16 sm:w-20 sm:h-20',
      text: 'text-4xl sm:text-5xl',
      stackedUnit: 'text-[24px] leading-[22px]',
      stackedGrowth: 'text-[28px] leading-[26px]',
      gap: 'gap-3.5',
    },
    '2xl': {
      icon: 'w-24 h-24 sm:w-28 sm:h-28',
      text: 'text-5xl sm:text-6xl',
      stackedUnit: 'text-[34px] leading-[32px]',
      stackedGrowth: 'text-[42px] leading-[40px]',
      gap: 'gap-4',
    },
  };

  const cfg = sizeConfig[size] || sizeConfig.md;

  // Dark Mode: Vibrant Lime #A8E635 (matching image exactly)
  // Light Mode: High-contrast Dark Slate #0F172A
  const growthTextColor = isLight ? 'text-[#0F172A]' : 'text-[#A8E635]';
  const unitTextColor = isLight ? 'text-[#475569]' : 'text-white';

  if (variant === 'icon-only' || !showText) {
    return <UnitGrowthIcon className={`${cfg.icon} ${className}`} theme={theme} />;
  }

  // Exact Single-Line Lockup matching uploaded logo: Icon + "Growth"
  if (variant === 'exact') {
    return (
      <div className={`inline-flex items-center ${cfg.gap} font-sans select-none tracking-tight ${className}`}>
        <UnitGrowthIcon className={cfg.icon} theme={theme} />
        <span className={`font-black ${cfg.text} ${growthTextColor} tracking-tight leading-none`}>
          Growth
        </span>
      </div>
    );
  }

  // Horizontal Full Lockup: Icon + "Unit" + "Growth"
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center ${cfg.gap} font-sans select-none tracking-tight ${className}`}>
        <UnitGrowthIcon className={cfg.icon} theme={theme} />
        <div className={`font-black ${cfg.text} leading-none flex items-center gap-1`}>
          <span className={unitTextColor}>Unit</span>
          <span className={growthTextColor}>Growth</span>
        </div>
      </div>
    );
  }

  // Stacked 2-line Lockup: Icon + "Unit" / "Growth"
  return (
    <div className={`inline-flex items-center ${cfg.gap} font-sans select-none ${className}`}>
      <UnitGrowthIcon className={cfg.icon} theme={theme} />
      <div className="flex flex-col justify-center text-left font-black tracking-tight select-none">
        <span className={`${cfg.stackedUnit} ${unitTextColor} font-black`}>
          Unit
        </span>
        <span className={`${cfg.stackedGrowth} ${growthTextColor} font-black mt-0.5`}>
          Growth
        </span>
      </div>
    </div>
  );
};

export default UnitGrowthLogo;
