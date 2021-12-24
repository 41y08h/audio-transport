import classNames from "classnames";
import { forwardRef } from "react";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ loading = false, children, ...passedProps }, ref) => {
    const props = { disabled: loading, ...passedProps };
    return (
      <button
        {...props}
        ref={ref}
        className={classNames(
          "bg-blue-600 px-3 py-1.5 rounded-sm flex items-center",
          props.className
        )}
      >
        {loading && <Spinner />} {children}
      </button>
    );
  }
);

export default Button;
