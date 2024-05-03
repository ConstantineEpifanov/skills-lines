import { useMemo } from 'react';
import { SKILLS } from '../../vendors/constants';
import CircleLayout from '../CircleLayout';

export default function InnerCircle() {
  const names = useMemo(() => SKILLS.map(item => item.name), []);

  return <CircleLayout items={names} blockColor="grey" />;
}
