import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize Mermaid with a neutral theme that respects site typography.
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Nunito", sans-serif',
    lineColor: '#CBD5E1'
  }
});

const MermaidDiagram = ({ chart }) => {
  const [svg, setSvg] = useState('');
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const { svg } = await mermaid.render(idRef.current, chart.trim());
        if (!cancelled) {
          setSvg(svg);
        }
      } catch (err) {
        // Surface basic information in the console to make debugging easier in dev.
        // eslint-disable-next-line no-console
        console.error('Mermaid render error', err);
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div className="w-full overflow-x-auto">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};

export default MermaidDiagram;

