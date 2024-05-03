import { useMemo, useState } from 'react';
import { SKILLS } from '../../vendors/constants';
import CircleLayout from '../CircleLayout';
import InnerCircle from '../InnerCircle';
import Line from '../Line';

export default function OuterCircle() {
  const [activeBlock, setActiveBlock] = useState<HTMLDivElement>();
  const [activeChildArray, setActiveChildArray] = useState<HTMLDivElement>();

  const onBlockClick = (block: HTMLDivElement) => {
    setActiveBlock(block);
    setActiveChildArray(block.parentElement as HTMLDivElement);
  };

  const allUniqueSkills = useMemo(
    () =>
      Array.from(
        new Set(
          SKILLS.reduce((acc, item) => {
            return acc.concat(item.mainSkills, item.otherSkills);
          }, [] as string[]),
        ),
      ),
    [SKILLS],
  );

  return (
    <CircleLayout items={allUniqueSkills} onBlockClick={onBlockClick}>
      {activeBlock && activeChildArray && (
        <Line block1={activeBlock} block2={activeChildArray} />
      )}
      <InnerCircle />
    </CircleLayout>
  );
}
