import styles from "../styles/Home.module.scss";
import { Link } from "react-router-dom";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

function App() {
  const [username, setUsername] = useState("");
  const usernameValidationQuery = useQuery(
    ["validate-username", username],
    () =>
      axios
        .get("/validate-username", { params: { username } })
        .then((res) => res.data),
    { staleTime: Infinity, enabled: username.length > 0, retry: false }
  );

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUsername(event.target.value.trim());
  };

  return (
    <div>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Sign Up</h1>
        <form className={styles.form}>
          <label htmlFor="username">Pick a username</label>
          <div className={styles.usernameContainer}>
            <input
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            {username.length > 0 && (
              <div>
                {usernameValidationQuery.isFetching
                  ? "..."
                  : usernameValidationQuery.data?.valid
                  ? "✔️"
                  : "❌"}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
