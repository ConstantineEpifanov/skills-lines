import { memo, useMemo } from 'react';
import { SKILLS } from '../../vendors/constants';
import CircleLayout from '../CircleLayout';

const InnerCircle = memo(() => {
  const names = useMemo(() => SKILLS.map(item => item.name), []);

  return <CircleLayout items={names} blockColor="grey" />;
});

export default InnerCircle;
