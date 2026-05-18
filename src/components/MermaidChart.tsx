import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter',
});

interface MermaidChartProps {
  chart: string;
}

export const MermaidChart: React.FC<MermaidChartProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
    }
  }, [chart]);

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute('data-processed');
      mermaid.render('mermaid-' + Math.random().toString(36).substr(2, 9), chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    }
  }, [chart]);

  return (
    <div className="mermaid flex justify-center bg-neutral-900/30 p-6 rounded-xl border border-neutral-800" ref={ref}>
      {chart}
    </div>
  );
};
