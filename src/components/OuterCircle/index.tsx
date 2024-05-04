import { useMemo } from 'react';

import { SKILLS } from '../../vendors/constants';
import CircleLayout from '../CircleLayout';
import { useAppSelector } from '../../hooks/redux';

export default function OuterCircle() {
  const block = useAppSelector(state => state.block);
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
  const names = useMemo(() => SKILLS.map(item => item.name), []);

  const sortedSkills = useMemo(() => {
    // Удалить дубликаты скиллов из allUniqueSkills
    const filteredSkills = allUniqueSkills.filter(
      skill =>
        !block.mainSkills.includes(skill) && !block.otherSkills.includes(skill),
    );
    console.log(filteredSkills);
    const insertIndex = names.findIndex(name => name === block.name);

    return [
      ...filteredSkills.slice(0, (insertIndex * 4) / 2),
      ...block.mainSkills,
      ...block.otherSkills,
      ...filteredSkills.slice((insertIndex * 4) / 2),
    ];
  }, [block, allUniqueSkills, names]);

  return (
    <>
      <CircleLayout items={sortedSkills} />
    </>
  );
}
