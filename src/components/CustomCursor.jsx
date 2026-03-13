import React from 'react';
import { TYPOGRAPHY } from '../layouts/case-study';

const CustomCursor = ({ mousePos, showGlass, showDot }) => (
  <>
    {showGlass && (
      <div
        className="fixed top-0 left-0 pointer-events-none z-[300] flex items-center justify-center transition-opacity duration-150 opacity-100"
        style={{ transform: `translate(${mousePos.x - 40}px, ${mousePos.y - 40}px)` }}
      >
        <div className="relative w-20 h-20 rounded-full border border-slate-900/30 flex items-center justify-center overflow-hidden cursor-glass-refraction">
          <div className="absolute inset-0 cursor-caustic-pattern" />
          <div className="absolute inset-0 cursor-refractive-highlight" />
          <div className="absolute inset-0 cursor-chromatic-aberration" />
          <span className={`relative ${TYPOGRAPHY.caption} text-slate-900 z-10 cursor-text-refraction`}>View</span>
        </div>
      </div>
    )}
    {showDot && (
      <div
        className="fixed top-0 left-0 pointer-events-none z-[300] w-1.5 h-1.5 bg-slate-900 rounded-full transition-opacity duration-150"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      />
    )}
  </>
);

export default CustomCursor;
