import classNames from "classnames";
import { forwardRef } from "react";
import styles from "./Button.module.scss";

const Button = forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>((props, ref) => (
  <button
    {...props}
    ref={ref}
    className={classNames(styles.button, props.className)}
  />
));

export default Button;
