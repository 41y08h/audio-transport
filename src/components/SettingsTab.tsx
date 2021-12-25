import classNames from "classnames";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

type LinkPropsType = LinkProps & React.RefAttributes<HTMLAnchorElement>;

interface Props extends LinkPropsType {
  active?: boolean;
}

const SettingsTab: FC<Props> = ({
  children,
  className,
  active = false,
  ...props
}) => {
  return (
    <Link
      {...props}
      className={classNames(
        "w-full text-center py-3 rounded-t-md text-white flex items-center justify-center space-x-2",
        active ? "bg-gray-200/30" : "bg-gray-200/10",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default SettingsTab;
