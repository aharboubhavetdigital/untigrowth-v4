import React, { useEffect } from 'react';
import { splashCursor, SplashCursorOptions } from '../lib/splashCursor';

export interface FluidSplashCursorProps extends SplashCursorOptions {
  className?: string;
}

export const FluidSplashCursor: React.FC<FluidSplashCursorProps> = (props) => {
  useEffect(() => {
    // Mount page-level fluid splash cursor overlay
    const controller = splashCursor({
      curl: props.curl ?? 12,
      densityDissipation: props.densityDissipation ?? 3.0,
      velocityDissipation: props.velocityDissipation ?? 2.0,
      pressure: props.pressure ?? 0.1,
      pressureIterations: props.pressureIterations ?? 20,
      splatRadius: props.splatRadius ?? 0.2,
      splatForce: props.splatForce ?? 6000,
      shading: props.shading ?? true,
      rainbow: props.rainbow ?? true,
      intensity: props.intensity ?? 0.18,
      idleStopMs: props.idleStopMs ?? 4000,
      respectReducedMotion: props.respectReducedMotion ?? true,
      zIndex: props.zIndex ?? 50,
    });

    return () => {
      controller.destroy();
    };
  }, [
    props.curl,
    props.densityDissipation,
    props.velocityDissipation,
    props.pressure,
    props.pressureIterations,
    props.splatRadius,
    props.splatForce,
    props.shading,
    props.rainbow,
    props.intensity,
    props.idleStopMs,
    props.respectReducedMotion,
    props.zIndex,
  ]);

  return null; // The canvas is fixed and attached to document.body automatically
};

export default FluidSplashCursor;
