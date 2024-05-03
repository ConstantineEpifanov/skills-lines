import { useMemo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { SKILLS } from '../../vendors/constants';
import CircleLayout from '../CircleLayout';
import InnerCircle from '../InnerCircle';
import Line from '../Line';

export default function OuterCircle() {
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

  console.log(itemsForActiveBlock.map(item => getSkillBlockId(item)));

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
