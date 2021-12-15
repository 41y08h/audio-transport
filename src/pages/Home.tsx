import styles from "../styles/Home.module.scss";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useAuth } from "../contexts/AuthContext";
import FormInput from "../components/FormInput";
import Avatar from "../components/Avatar/Avatar";
import { ReactComponent as XIcon } from "../assets/x.svg";
import { ReactComponent as CheckIcon } from "../assets/check.svg";
import { ReactComponent as ThreeDotsIcon } from "../assets/three-dots.svg";

const Home: FC = () => {
  const { search } = useLocation();
  const { currentUser, storedUsername } = useAuth();
  const { registerMutation } = useAuth();
  const [username, setUsername] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const usernameValidationQuery = useQuery(
    ["validate-username", username],
    () =>
      axios
        .get("/auth/validate-username", { params: { username } })
        .then((res) => res.data),
    { staleTime: Infinity, enabled: username.length > 0, retry: false }
  );

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUsername(event.target.value.trim());
  };
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const passwordInput = passwordInputRef.current;
    if (!passwordInput) return;

    registerMutation.mutate({
      username,
      password: passwordInputRef.current.value,
    });
  };

  const isUsernameValid = usernameValidationQuery.data?.valid;

  if (currentUser) return <Redirect to="/app" />;
  if (storedUsername && search !== "?i") return <Redirect to="/login" />;
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Avatar />
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="username">Pick a username</label>
          <div className={styles.usernameContainer}>
            <FormInput
              id="username"
              placeholder="Username"
              minLength={3}
              value={username}
              onChange={handleUsernameChange}
            />
            {username.length > 0 && (
              <div>
                {usernameValidationQuery.isFetching ? (
                  <ThreeDotsIcon />
                ) : isUsernameValid ? (
                  <CheckIcon />
                ) : (
                  <XIcon />
                )}
              </div>
            )}
          </div>
          <FormInput
            ref={passwordInputRef}
            type="password"
            placeholder="Password"
            minLength={6}
          />

          <button
            type="submit"
            disabled={
              usernameValidationQuery.isFetching ||
              !isUsernameValid ||
              registerMutation.isLoading
            }
          >
            Sign Up
          </button>
        </form>
        <div className={styles.bottomText}>
          <small>
            Already registered? <Link to="/login">Login</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Home;
