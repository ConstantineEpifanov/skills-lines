import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Line from '../Line';

const LinesContainer = () => {
  const { profName, skillName, professionArray, mainSkills, otherSkills } =
    useAppSelector(state => state.block);
  const { skills, professions } = useAppSelector(state => state.circles);
  const [isLinesRendered, setIsLinesRendered] = useState(false);

  const getBlockId = useCallback((name: string) => `block-${name}`, []);

  const renderLines = useCallback(
    (array: string[], arrayName: string, color?: string) => {
      if (!array) {
        return;
      }

      return array.map(item => (
        <Line
          key={item}
          id1={getBlockId(arrayName)}
          id2={getBlockId(item)}
          color={color}
        />
      ));
    },

    [getBlockId],
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLinesRendered(true);
    }, 100);

    return () => setIsLinesRendered(false);
  }, [skills, professions]);

  if (!isLinesRendered) {
    return null;
  }

  return (
    <>
      {mainSkills && profName && renderLines(mainSkills, profName)}
      {otherSkills && profName && renderLines(otherSkills, profName, 'purple')}
      {professionArray && skillName && renderLines(professionArray, skillName)}
    </>
  );
};

export default LinesContainer;
