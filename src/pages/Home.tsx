import styles from "../styles/Home.module.scss";
import { useHistory } from "react-router-dom";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

function App() {
  const [username, setUsername] = useState("");
  const history = useHistory();
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
  const registerMutation = useMutation(() =>
    axios.post("/register", { username })
  );

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    await registerMutation.mutateAsync();
  };

  const isUsernameValid = usernameValidationQuery.data?.valid;

  return (
    <div>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          {"<"} user avatar {">"}
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="username">Pick a username</label>
          <div className={styles.usernameContainer}>
            <input
              id="username"
              placeholder="Username"
              minLength={3}
              value={username}
              onChange={handleUsernameChange}
            />
            {username.length > 0 && (
              <div>
                {usernameValidationQuery.isFetching
                  ? "..."
                  : isUsernameValid
                  ? "✔️"
                  : "❌"}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={
              usernameValidationQuery.isFetching ||
              !isUsernameValid ||
              registerMutation.isLoading
            }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
