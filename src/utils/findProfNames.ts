import { SKILLS } from './constants';

export default function findProfNames() {
  return SKILLS.map(item => item.name);
}
