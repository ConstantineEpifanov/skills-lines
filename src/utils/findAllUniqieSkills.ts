import { SKILLS } from './constants';

export default function findAllUniqueSkills() {
  const set = new Set<string>();
  for (const skill of SKILLS.flatMap(skill => [
    ...skill.mainSkills,
    ...skill.otherSkills,
  ])) {
    set.add(skill);
  }
  return Array.from(set);
}
