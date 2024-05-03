import { useMemo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { SKILLS } from '../../vendors/constants';
import CircleLayout from '../CircleLayout';
import InnerCircle from '../InnerCircle';
import Line from '../Line';

export default function OuterCircle() {
  // Cелектор для получения активного блока из состояния
  const activeBlockName = useAppSelector(state => state.block.name);

  const block = useAppSelector(state => state.block);
  // const names = useMemo(() => SKILLS.map(item => item.name), []);
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

  // const itemsForActiveBlock = useMemo(() => {
  //   return activeBlockName
  //     ? SKILLS.filter(item => item.name === activeBlockName).flatMap(item => [
  //         ...item.mainSkills,
  //         ...item.otherSkills,
  //       ])
  //     : [];
  // }, [activeBlockName]);

  // const sortedSkills = useMemo(() => {
  //   // Удалить дубликаты скиллов из allUniqueSkills
  //   const filteredSkills = allUniqueSkills.filter(
  //     skill => !itemsForActiveBlock.includes(skill),
  //   );

  //   const insertIndex = names.findIndex(name => name === activeBlockName);

  //   let percentage = 0;
  //   if (insertIndex === -1) {
  //     percentage = 0;
  //   } else {
  //     percentage = Math.ceil((insertIndex / allUniqueSkills.length - 1) * 100);
  //   }

  //   return [
  //     ...filteredSkills.slice(0, percentage),
  //     ...itemsForActiveBlock,
  //     ...filteredSkills.slice(percentage),
  //   ];
  // }, [activeBlockName, allUniqueSkills, itemsForActiveBlock, names]);

  const getSkillBlockId = (skillName: string) => `block-${skillName}`;

  const renderLines = (skillsArray: string[], color?: string) => {
    return skillsArray.map(skill => (
      <Line
        key={skill}
        id2={getSkillBlockId(skill)}
        id1={getSkillBlockId(activeBlockName)}
        color={color}
      />
    ));
  };
  return (
    <>
      <CircleLayout items={allUniqueSkills}>
        <InnerCircle />
      </CircleLayout>
      {block.mainSkills && renderLines(block.mainSkills)}
      {block.otherSkills && renderLines(block.otherSkills, 'purple')}
    </>
  );
}
