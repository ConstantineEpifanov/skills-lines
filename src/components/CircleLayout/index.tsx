/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './styles.module.scss';

const CircleLayout = React.forwardRef<
  HTMLDivElement[],
  { items: any[]; children?: React.ReactNode }
>(({ items, children }, ref) => {
  const refs = ref as React.MutableRefObject<HTMLDivElement[]>;
  refs.current = refs.current.slice(0, items.length);

  const blockWidth = 30; // Ширина блока

  const numberOfBlocks = items.length; // Количество блоков

  const totalLength = numberOfBlocks * (blockWidth * 2); // Общая длина с промежутками
  const radius = totalLength / (2 * Math.PI); // Половина ширины и высоты .circleContainer
  const angleStep = 360 / items.length; // Шаг угла для каждого блока

  const circleStyle = {
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
  };

  return (
    <div className={styles.circleContainer} style={circleStyle}>
      {items.map((item, index) => {
        const angle = angleStep * index;
        const angleRad = (angle * Math.PI) / 180; // Конвертация угла в радианы

        // Рассчитываем смещение для текста
        const offsetX = Math.cos(angleRad) * blockWidth * 2; // Смещение по оси X
        const offsetY = Math.sin(angleRad) * blockWidth * 2; // Смещение по оси Y

        const blockStyle = {
          transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
          width: `${blockWidth}px`,
          height: `${blockWidth}px`,
          marginTop: `-${blockWidth / 2}px`,
          marginLeft: `-${blockWidth / 2}px`,
        };

        const textStyle = {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(${offsetX}px, ${offsetY}px) translate(-50%, -50%)`,
        };

        return (
          <div className={styles.block} key={index} style={blockStyle}>
            <p
              className={styles.text}
              style={{ ...(textStyle as React.CSSProperties) }}
            >
              {item}
            </p>
          </div>
        );
      })}
      {children}
    </div>
  );
});

export default CircleLayout;
