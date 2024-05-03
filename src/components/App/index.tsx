import { useMemo } from 'react';
import { SKILLS } from '../../vendors/constants';
import CircleLayout from '../CircleLayout';
import styles from './styles.module.scss';

function App() {
  const names = useMemo(() => SKILLS.map(item => item.name), []);
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

  console.log(names, allUniqueSkills);
  return (
    <main className={styles.main}>
      <CircleLayout items={allUniqueSkills}>
        <CircleLayout items={names} />
      </CircleLayout>
    </main>
  );
}

export default App;
