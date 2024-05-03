import { useAppSelector } from '../../hooks/redux';
import Line from '../Line';

export default function LinesContainer() {
  const activeBlockName = useAppSelector(state => state.block.name);

  const block = useAppSelector(state => state.block);
  const getSkillBlockId = (skillName: string) => `block-${skillName}`;

  const renderLines = (skillsArray: string[], color?: string) => {
    return skillsArray.map(skill => (
      <Line
        key={skill}
        id2={getSkillBlockId(skill)}
        id1={getSkillBlockId(activeBlockName)}
        color={color}
      />
    ));
  };

  return (
    <>
      {' '}
      {block.mainSkills && renderLines(block.mainSkills)}
      {block.otherSkills && renderLines(block.otherSkills, 'purple')}
    </>
  );
}
