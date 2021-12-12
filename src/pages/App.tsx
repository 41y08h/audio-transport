import { FC } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/App.module.scss";
import { useHotkeys } from "react-hotkeys-hook";
import { useHistory } from "react-router";

const App: FC = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  useHotkeys("CTRL + F2", () => {
    history.push("/settings");
  });

  return (
    <div className={styles.container}>
      <p className={styles.hero}>{currentUser?.username[0].toUpperCase()}</p>
    </div>
  );
};

export default App;
