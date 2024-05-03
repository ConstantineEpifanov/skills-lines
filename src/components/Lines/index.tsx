
import { useRef, useState, useEffect } from 'react';

export default function Lines() {

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  useEffect(() => {
    const rect1 = ref1.current?.getBoundingClientRect();
    const rect2 = ref2.current?.getBoundingClientRect();

    if (rect1 && rect2) {
      setLine({
        x1: rect1.x + rect1.width,
        y1: rect1.y + rect1.height,
        x2: rect2.x,
        y2: rect2.y,
      });
    }
  }, []);

  return (

    
      <div>
        <div
          ref={ref1}
          style={{
            position: 'absolute',
            top: '50px',
            left: '50px',
            width: '100px',
            height: '100px',
            backgroundColor: 'red',
          }}
        />
        <div
          ref={ref2}
          style={{
            position: 'absolute',
            top: '450px',
            left: '300px',
            width: '100px',
            height: '100px',
            backgroundColor: 'blue',
          }}
        />

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
      </div>

  );
}
