import styles from './styles.module.scss';

import OuterCircle from '../OuterCircle';
import LinesContainer from '../LinesContainer';
import InnerCircle from '../InnerCircle';

function App() {
  return (
    <main className={styles.main}>
      <div className={styles.circles}>
        <OuterCircle />
        <InnerCircle />
      </div>
      <LinesContainer />
    </main>
  );
}

export default App;
