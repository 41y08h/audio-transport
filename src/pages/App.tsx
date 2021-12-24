import { FC } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/App.module.scss";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router";

const App: FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useHotkeys("CTRL + F2", () => {
    navigate("/settings");
  });

  return (
    <div className={styles.container}>
      <p className={styles.hero}>{currentUser?.username[0].toUpperCase()}</p>
    </div>
  );
};

export default App;
