import React, { useState, useEffect } from 'react';
import { TYPOGRAPHY } from '../../layouts/case-study';

const HEADING_TEXT = 'Playground 𐦂';

const PlaygroundIntro = () => {
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex >= HEADING_TEXT.length) return;
    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, 40);
    return () => clearTimeout(timeout);
  }, [charIndex]);

  return (
    <div className="relative w-full h-full flex flex-col justify-center z-20">
      <div className="space-y-4 sm:space-y-6 my-auto pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 text-left">
        <h2 className={`${TYPOGRAPHY.title} text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-[0.9]`}>
          {HEADING_TEXT.substring(0, charIndex)}
        </h2>
        <p className={`${TYPOGRAPHY.caption} text-slate-600 text-sm leading-relaxed max-w-md`}>
          Here I will open a little gallery of fun things I made outside of work. Please revisit us when we're open!
        </p>
      </div>
    </div>
  );
};

export default PlaygroundIntro;

