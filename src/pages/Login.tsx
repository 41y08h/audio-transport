import { FC } from "react";
import Avatar from "../components/Avatar/Avatar";
import FormInput from "../components/FormInput";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/Login.module.scss";
import { ReactComponent as ChevronRightIcon } from "../assets/chevron-right.svg";
import { Link } from "react-router-dom";

const Login: FC = () => {
  const { registeredAs } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Avatar />
        {registeredAs && (
          <p className={styles.usernameHeading}>
            <p>{registeredAs}</p>
          </p>
        )}
        <form className={styles.form}>
          {!registeredAs && <FormInput placeholder="Username" />}
          <div className={styles.passwordContainer}>
            <FormInput type="password" placeholder="Password" />
            {registeredAs && (
              <button type="submit">
                <ChevronRightIcon />
              </button>
            )}
          </div>
          {!registeredAs && <button type="submit">Login</button>}
        </form>

        <div className={styles.bottomText}>
          <small>
            Not registered? <Link to={registeredAs ? "/?i" : "/"}>Sign up</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
