import { Search } from './search';
import { Results } from './results';
import { ResultsProvider } from './store/results';
import styles from './App.module.css';

const Layout = () => (
  <div className={styles['app-container']}>
    <div className={styles['app-search']}>
      <Search />
    </div>

    <div className={styles['app-results']}>
      <Results />
    </div>
  </div>
);

function App() {
  return (
    <ResultsProvider>
      <Layout />
    </ResultsProvider>
  );
}

export default App;
