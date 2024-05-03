import { useState, useEffect } from 'react';

interface LineProps {
  block1: HTMLDivElement;
  block2: HTMLDivElement;
}

export default function Line({ block1, block2 }: LineProps) {
  const [line, setLine] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  useEffect(() => {
    const rect1 = block1.getBoundingClientRect();
    const rect2 = block2.getBoundingClientRect();

    setLine({
      x1: rect1.x + rect1.width / 2,
      y1: rect1.y + rect1.height / 2,
      x2: rect2.x + rect2.width / 2,
      y2: rect2.y + rect2.height / 2,
    });
  }, [block1, block2]);

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <path
        d={`M ${line.x1},${line.y1} Q ${(line.x1 + line.x2) / 2},${line.y1} ${(line.x1 + line.x2) / 2},${(line.y1 + line.y2) / 2} T ${line.x2},${line.y2}`}
        stroke="red"
        fill="transparent"
      >
        <animate
          attributeName="stroke-dasharray"
          from="0, 1000"
          to="1000, 0"
          dur="3s"
          repeatCount="none"
        />
      </path>
    </svg>
  );
}
