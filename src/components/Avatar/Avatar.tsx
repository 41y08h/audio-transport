import { FC } from "react";
import styles from "./Avatar.module.scss";
import avatarImage from "./avatar.svg";

const Avatar: FC = () => {
  return (
    <div className={styles.avatar}>
      <img src={avatarImage} alt="avatar" />
    </div>
  );
};

export default Avatar;
