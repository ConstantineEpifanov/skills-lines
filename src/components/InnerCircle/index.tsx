import { memo, useEffect, useMemo } from 'react';

import CircleLayout from '../CircleLayout';
import { useAppSelector } from '../../hooks/redux';

import findProfNames from '../../utils/findProfNames';
import { useActions } from '../../hooks/actions';

const InnerCircle = memo(() => {
  const block = useAppSelector(state => state.block);
  const { skills, professions } = useAppSelector(state => state.circles);
  const { setProfessionCircle } = useActions();

  const allProfNames = useMemo(() => findProfNames(), []);

  const filteredNames = useAppSelector(state => state.block?.professionArray);

  const sortedProfs = useMemo(() => {
    const profsToRender = professions.length !== 0 ? professions : allProfNames;
    const filteredProfs = profsToRender.filter(
      prof =>
        !filteredNames.inMain.includes(prof) &&
        !filteredNames.inOther.includes(prof),
    );

    const skillIndex = skills.findIndex(name => name === block.skillName);

    let insertIndex = Math.ceil(
      (profsToRender.length / skills.length) * skillIndex -
        Object.values(filteredNames).flatMap(value =>
          Array.isArray(value) ? value : [value],
        ).length /
          2,
    );

    if (insertIndex < 0) {
      insertIndex = 0;
    }

    return [
      ...filteredProfs.slice(0, insertIndex),
      ...filteredNames.inMain,
      ...filteredNames.inOther,
      ...filteredProfs.slice(insertIndex),
    ];
  }, [block.skillName, filteredNames]);

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
