import { FC, FormEventHandler, useRef } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "../components/Avatar/Avatar";
import FormInput from "../components/FormInput";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/Login.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as ChevronRightIcon } from "../assets/chevron-right.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";

const Login: FC = () => {
  const { storedUsername, loginMutation, clearStoredUsername, currentUser } =
    useAuth();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const username = storedUsername || usernameInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (!username || !password) return;

    loginMutation.mutate({ username, password });
  };

  if (currentUser) return <Redirect to="/app" />;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Avatar />
        {storedUsername && (
          <div className={styles.bigUsername}>
            <p>{storedUsername}</p>
            <button onClick={clearStoredUsername}>
              <EditIcon />
            </button>
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          {!storedUsername && (
            <FormInput ref={usernameInputRef} placeholder="Username" />
          )}
          <div className={styles.passwordContainer}>
            <FormInput
              ref={passwordInputRef}
              type="password"
              placeholder="Password"
            />
            {storedUsername && (
              <button type="submit">
                <ChevronRightIcon />
              </button>
            )}
          </div>
          {!storedUsername && <button type="submit">Login</button>}
        </form>

        <div className={styles.bottomText}>
          <small>
            Not registered?{" "}
            <Link to={storedUsername ? "/?i" : "/"}>Sign up</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
