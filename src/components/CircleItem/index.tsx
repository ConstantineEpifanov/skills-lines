import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

export default function CircleItem({
  step,
  countNumber,
  blockColor = 'peach',
  blockWidth,
  text,
  radius,
}: {
  step: number;
  countNumber: number;
  blockColor: string;
  blockWidth: number;
  text: string;
  radius: number;
}) {
  const { setName } = useActions();
  const { name } = useAppSelector(state => state.block);

  const [active, setActive] = React.useState(() => name === text);

  const angleStep = 360 / step; // Шаг угла для каждого блока items.length
  const angle = angleStep * countNumber; // index
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

  function handleClick() {
    setName(text);
  }

  useEffect(() => {
    setActive(name === text);
  }, [name, text]);

  return (
    <div
      className={`${styles.block} ${active ? styles.block_active : ''}`}
      style={blockStyle}
      data-tag={active ? 'green' : blockColor}
      onClick={handleClick}
    >
      <p
        className={styles.text}
        style={{ ...(textStyle as React.CSSProperties) }}
      >
        {text}
      </p>
    </div>
  );
}
