import React, { memo, useEffect } from 'react';
import styles from './styles.module.scss';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { SKILLS } from '../../vendors/constants';

const CircleItem = memo(
  ({
    step,
    countNumber,
    blockColor = 'peach',
    blockWidth,
    text,
    radius,
  }: {
    step: number;
    countNumber: number;
    blockColor?: string;
    blockWidth: number;
    text: string;
    radius: number;
  }) => {
    const { setNewBlock } = useActions();

    const block = useAppSelector(state => state.block);

    const [active, setActive] = React.useState(() => block.name === text);
    const [chosen, setChosen] = React.useState(false);

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
      color: chosen || active ? 'black' : 'grey',
    };

    const defineDataTag = () => {
      switch (active || chosen || undefined) {
        case active:
          return 'green';
        case chosen:
          return 'orange';
        default:
          return blockColor;
      }
    };

    function handleClick() {
      if (SKILLS.filter(item => item.name === text)[0].name === text) {
        setNewBlock({
          name: text,
          mainSkills: SKILLS.filter(item => item.name === text)[0].mainSkills,
          otherSkills: SKILLS.filter(item => item.name === text)[0].otherSkills,
        });
      }
    }

    useEffect(() => {
      setActive(block.name === text);
    }, [block, text]);

    useEffect(() => {
      if (
        block.mainSkills?.includes(text) ||
        block.otherSkills?.includes(text)
      ) {
        setChosen(true);
      } else {
        setChosen(false);
      }
    }, [text, block]);

    return (
      <div
        className={`${styles.block} ${active ? styles.block_active : ''}`}
        style={blockStyle}
        data-tag={defineDataTag()}
        onClick={handleClick}
        id={`block-${text}`}
      >
        <p
          className={styles.text}
          style={{ ...(textStyle as React.CSSProperties) }}
        >
          {text}
        </p>
      </div>
    );
  },
);

export default CircleItem;
