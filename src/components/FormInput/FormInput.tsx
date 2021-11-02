import classNames from "classnames";
import { ForwardedRef, forwardRef } from "react";
import styles from "./FormInput.module.scss";

const FormInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames(styles.formInput, props.className)}
  />
));

export default FormInput;
