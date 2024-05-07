import { memo, useEffect, useMemo } from 'react';

import CircleLayout from '../CircleLayout';
import { useAppSelector } from '../../hooks/redux';
import findAllUniqueSkills from '../../utils/findAllUniqieSkills';
import findProfNames from '../../utils/findProfNames';
import { useActions } from '../../hooks/actions';

const InnerCircle = memo(() => {
  const block = useAppSelector(state => state.block);
  const { skills, professions } = useAppSelector(state => state.circles);
  const { setProfessionCircle } = useActions();
  const allUniqueSkillsArray = useMemo(() => findAllUniqueSkills(), []);
  const allProfNames = useMemo(() => findProfNames(), []);

  const filteredNames = useAppSelector(state => state.block?.professionArray);

  const sortedProfs = useMemo(() => {
    const skillsToRender =
      professions.length !== 0 ? professions : allProfNames;
    const filteredProfs = skillsToRender.filter(
      prof => !filteredNames.includes(prof),
    );

    const skillIndex = skills.findIndex(name => name === block.skillName);

    let insertIndex = Math.ceil(
      (allProfNames.length / skills.length) * skillIndex -
        filteredNames.length / 2,
    );
    console.log(
      allProfNames.length,
      allUniqueSkillsArray.length,
      skillIndex,
      insertIndex,
    );

    if (insertIndex < 0) {
      insertIndex = 0;
    }

    return [
      ...filteredProfs.slice(0, insertIndex),
      ...filteredNames,
      ...filteredProfs.slice(insertIndex),
    ];
  }, [allProfNames, allUniqueSkillsArray, block.skillName, filteredNames]);

  useEffect(() => {
    setProfessionCircle({ professions: sortedProfs });
  }, [sortedProfs, setProfessionCircle]);

  return (
    <>
      <CircleLayout items={professions} blockColor="grey" />
    </>
  );
});

export default InnerCircle;
