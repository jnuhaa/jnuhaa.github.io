import React from 'react';

const CustomCursor = ({ mousePos, showDot, tintColor }) => (
  <>
    {showDot && (
      <div
        className="fixed top-0 left-0 pointer-events-none z-[300] w-1.5 h-1.5 rounded-full transition-colors duration-150"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          backgroundColor: tintColor ?? '#0f172a'
        }}
      />
    )}
  </>
);

export default CustomCursor;
