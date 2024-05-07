import { useEffect, useMemo } from 'react';

import CircleLayout from '../CircleLayout';
import { useAppSelector } from '../../hooks/redux';

import findAllUniqueSkills from '../../utils/findAllUniqieSkills';
// import findProfNames from '../../utils/findProfNames';
import { useActions } from '../../hooks/actions';

export default function OuterCircle() {
  const block = useAppSelector(state => state.block);
  const circles = useAppSelector(state => state.circles);
  const { setSkillsCircle } = useActions();
  const allUniqueSkillsArray = useMemo(() => findAllUniqueSkills(), []);
  // const allProfNames = useMemo(() => findProfNames(), []);

  const sortedSkills = useMemo(() => {
    const skillsToFilter =
      circles.skills.length !== 0 ? circles.skills : allUniqueSkillsArray;

    const filteredSkills = skillsToFilter.filter(
      skill =>
        !(block.mainSkills && block.mainSkills.includes(skill)) &&
        block.otherSkills &&
        !block.otherSkills.includes(skill),
    );

    const profIndex = circles.professions.findIndex(
      name => name === block.profName,
    );

    const skillsToRenderLength =
      allUniqueSkillsArray.length - filteredSkills.length;

    let insertIndex = Math.floor(
      (allUniqueSkillsArray.length / circles.professions.length) * profIndex -
        skillsToRenderLength / 2,
    );

    if (insertIndex < 0) {
      insertIndex = 0;
    }

    return [
      ...filteredSkills.slice(0, insertIndex),
      ...(block.mainSkills ?? []),
      ...(block.otherSkills ?? []),
      ...filteredSkills.slice(insertIndex),
    ];
  }, [block, allUniqueSkillsArray, circles.professions]);

  useEffect(() => {
    setSkillsCircle({ skills: sortedSkills });
  }, [sortedSkills, setSkillsCircle]);

  return (
    <>
      <CircleLayout items={circles.skills} />
    </>
  );
}
