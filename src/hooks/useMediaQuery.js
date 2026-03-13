import { useState, useEffect } from 'react';

/**
 * Returns true when the viewport matches the given media query.
 * @param {string} query - Media query string (e.g. '(min-width: 1024px)')
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
