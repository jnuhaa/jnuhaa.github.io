import React, { useState, useEffect } from 'react';

const TypewriterFast = ({ text, speed = 10, delay = 0, className }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    let i = 0;
    let intervalId = null;

    const startTimeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
        } else if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return <span className={className}>{displayText}</span>;
};

export default TypewriterFast;
