import { useMemo } from 'react';

import { SKILLS } from '../../vendors/constants';
import CircleLayout from '../CircleLayout';

export default function OuterCircle() {
  // Cелектор для получения активного блока из состояния

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

  return (
    <>
      <CircleLayout items={allUniqueSkills}></CircleLayout>
    </>
  );
}
