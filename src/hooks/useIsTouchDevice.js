import { useState, useEffect } from 'react';

/**
 * Detects if the device supports touch. Use to disable custom cursor and enable tap-as-select.
 * @returns {boolean} true on touch-capable devices
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const check = () =>
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(check());
  }, []);

  return isTouch;
}
