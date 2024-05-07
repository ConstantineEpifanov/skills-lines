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

  // const [dataTag, setDataTag] = React.useState(() => defineDataTag());

  useEffect(() => {
    setActive(block.profName === text || block.skillName === text);
    setChosen(
      block.mainSkills?.includes(text) ||
        block.otherSkills?.includes(text) ||
        block.professionArray?.includes(text) ||
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

  // useEffect(() => {
  //   setDataTag(blockColor);
  // }, [active, chosen]);

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

  // function defineDataTag() {
  //   switch (active || chosen || undefined) {
  //     case active:
  //       return 'green';
  //     case chosen:
  //       return 'orange';
  //     default:
  //       return blockColor;
  //   }
  // }

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
        professionArray: [],
        skillName: '',
      });
    }
    if (skill) {
      setNewBlock({
        profName: '',
        mainSkills: [],
        otherSkills: [],
        skillName: text,
        professionArray: SKILLS.filter(
          item =>
            item.mainSkills.includes(text) || item.otherSkills.includes(text),
        ).map(item => item.name),
      });
    }
  }

  useEffect(() => {
    setActive(block.profName === text || block.skillName === text);
    setChosen(
      block.mainSkills?.includes(text) ||
        block.otherSkills?.includes(text) ||
        block.professionArray?.includes(text),
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
