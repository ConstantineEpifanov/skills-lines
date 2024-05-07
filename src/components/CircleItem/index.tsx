import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { SKILLS } from '../../utils/constants';

const CircleItem = ({
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

  const [active, setActive] = React.useState(false);
  const [chosen, setChosen] = React.useState(false);

  useEffect(() => {
    setActive(block.profName === text || block.skillName === text);
    setChosen(
      block.mainSkills?.includes(text) ||
        block.otherSkills?.includes(text) ||
        block.professionArray?.inMain.includes(text) ||
        block.professionArray?.inOther.includes(text) ||
        false,
    );
  }, [
    text,
    block.profName,
    block.skillName,
    block.mainSkills,
    block.otherSkills,
    block.professionArray,
  ]);

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

  function handleSetProfBlock(text: string): {
    inMain: string[];
    inOther: string[];
  } {
    const result: {
      inMain: string[];
      inOther: string[];
    } = {
      inMain: [],
      inOther: [],
    };

    SKILLS.filter(item => {
      if (item.mainSkills?.includes(text)) {
        result.inMain.push(item.name);
      }
      if (item.otherSkills?.includes(text)) {
        result.inOther.push(item.name);
      }
    });
    return result;
  }

  function handleClick() {
    const profession = SKILLS.find(item => item.name === text);
    const skill = SKILLS.find(
      item => item.mainSkills.includes(text) || item.otherSkills.includes(text),
    );
    if (profession) {
      setNewBlock({
        profName: text,
        mainSkills: profession.mainSkills,
        otherSkills: profession.otherSkills,
        professionArray: {
          inMain: [],
          inOther: [],
        },
        skillName: '',
      });
    }
    if (skill) {
      setNewBlock({
        profName: '',
        mainSkills: [],
        otherSkills: [],
        skillName: text,
        professionArray: handleSetProfBlock(text),
      });
    }
  }

  useEffect(() => {
    setActive(block.profName === text || block.skillName === text);
    setChosen(
      block.mainSkills?.includes(text) ||
        block.otherSkills?.includes(text) ||
        block.professionArray?.inMain.includes(text) ||
        block.professionArray?.inOther.includes(text) ||
        false,
    );
  }, [text, block]);

  return (
    <div
      className={`${styles.block} ${active ? styles.block_active : ''} ${chosen ? styles.block_chosen : ''}`}
      style={blockStyle}
      data-tag={blockColor}
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
};

export default CircleItem;
