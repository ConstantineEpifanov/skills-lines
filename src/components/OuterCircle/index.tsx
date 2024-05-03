import { useEffect, useMemo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { SKILLS } from '../../vendors/constants';
import CircleLayout from '../CircleLayout';
import InnerCircle from '../InnerCircle';
import Line from '../Line';
import { useActions } from '../../hooks/actions';

export default function OuterCircle() {
  const { setActiveChildren } = useActions();
  // Cелектор для получения активного блока из состояния
  const activeBlockName = useAppSelector(state => state.block.name);
  const allUniqueSkills = useMemo(
    () =>
      Array.from(
        new Set(
          SKILLS.reduce(
            (acc, item) => acc.concat(item.mainSkills, item.otherSkills),
            [] as string[],
          ),
        ),
      ),
    [],
  );

  const itemsForActiveBlock = activeBlockName
    ? SKILLS.filter(item => item.name === activeBlockName).flatMap(item => [
        ...item.mainSkills,
        ...item.otherSkills,
      ])
    : [];

  // const sortedSkills = useMemo(() => {
  //   const skillsSet = new Set(itemsForActiveBlock);
  //   return [
  //     ...itemsForActiveBlock,
  //     ...allUniqueSkills.filter(skill => !skillsSet.has(skill)),
  //   ];
  // }, [activeBlockName, allUniqueSkills]);

  const getSkillBlockId = (skillName: string) => `block-${skillName}`;

  useEffect(() => {
    if (itemsForActiveBlock.length > 0) {
      setActiveChildren({
        mainSkills: itemsForActiveBlock,
        otherSkills: [],
      });
    }
  }, [activeBlockName]);

  return (
    <>
      <CircleLayout items={allUniqueSkills}>
        <InnerCircle />
      </CircleLayout>
      {itemsForActiveBlock.map(skill => (
        <Line
          key={skill}
          id2={getSkillBlockId(skill)}
          id1={getSkillBlockId(activeBlockName)}
        />
      ))}
    </>
  );
}
