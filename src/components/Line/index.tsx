import { useState, useEffect } from 'react';

type LineProps = {
  id1: string;
  id2: string;
  color?: string;
};

const Line = ({ id1, id2, color = 'hsla(29, 100%, 50%, 1)' }: LineProps) => {
  const [line, setLine] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  useEffect(() => {
    const updateLine = () => {
      const block1 = document.getElementById(id1);
      const block2 = document.getElementById(id2);

      if (block1 && block2) {
        const rect1 = block1.getBoundingClientRect();
        const rect2 = block2.getBoundingClientRect();

        setLine({
          x1: rect1.x + rect1.width / 2 + window.scrollX,
          y1: rect1.y + rect1.height / 2 + window.scrollY,
          x2: rect2.x + rect2.width / 2 + window.scrollX,
          y2: rect2.y + rect2.height / 2 + window.scrollY,
        });
      }
    };

    updateLine();
    window.addEventListener('resize', updateLine);
    return () => {
      window.removeEventListener('resize', updateLine);
    };
  }, [id1, id2]);

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    >
      <path
        d={`M ${line.x1},${line.y1} Q ${(line.x1 + line.x2) / 2},${line.y1} ${(line.x1 + line.x2) / 2},${(line.y1 + line.y2) / 2} T ${line.x2},${line.y2}`}
        stroke={color}
        fill="transparent"
        strokeWidth="2"
      >
        <animate
          attributeName="stroke-dasharray"
          from="0, 1000"
          to="1000, 0"
          dur="2s"
          repeatCount="none"
        />
      </path>
    </svg>
  );
};

export default Line;
