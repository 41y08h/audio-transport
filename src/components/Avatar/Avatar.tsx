import { FC } from "react";
import styles from "./Avatar.module.scss";
import avatarImage from "./avatar.svg";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Avatar: FC<Props> = (props) => {
  return (
    <div {...props} className={styles.avatar}>
      <img src={avatarImage} alt="avatar" />
    </div>
  );
};

export default Avatar;
