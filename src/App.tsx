import { Search } from "./search";
import { Results } from "./results";
import { ReposProvider } from "./store/repos";
import styles from "./App.module.css";

function Layout() {
  return (
    <div className={styles["app-container"]}>
      <div className={styles["app-grid"]}>
        <Search />
      </div>

      <div className={styles["app-cart"]}>
        <Results />
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <ReposProvider>
        <Layout />
      </ReposProvider>
    </>
  );
}

export default App;
