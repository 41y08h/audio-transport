import classNames from "classnames";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

const SettingsTab: FC<LinkProps & React.RefAttributes<HTMLAnchorElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link
      {...props}
      className={classNames(
        className,
        "w-full text-center py-3 bg-gray-200/20 rounded-t-md text-white flex items-center justify-center space-x-2"
      )}
    >
      {children}
    </Link>
  );
};

export default SettingsTab;
