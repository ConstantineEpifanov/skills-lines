import React, { memo, useCallback } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Line from '../Line';

const LinesContainer = memo(() => {
  const { name, mainSkills, otherSkills } = useAppSelector(
    state => state.block,
  );

  const getSkillBlockId = useCallback(
    (skillName: string) => `block-${skillName}`,
    [],
  );

  const renderLines = useCallback(
    (skillsArray: string[], color?: string) => {
      if (!skillsArray) {
        return;
      }

      return skillsArray.map(skill => (
        <Line
          key={skill}
          id2={getSkillBlockId(skill)}
          id1={getSkillBlockId(name)}
          color={color}
        />
      ));
    },
    [name, getSkillBlockId],
  );

  return (
    <>
      {mainSkills && renderLines(mainSkills)}
      {otherSkills && renderLines(otherSkills, 'purple')}
    </>
  );
});

export default LinesContainer;
