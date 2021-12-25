import classNames from "classnames";
import { FC } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";

type Props = LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    to: string;
  };

const SettingsTab: FC<Props> = ({ children, className, ...props }) => {
  const location = useLocation();
  const active = location.pathname.endsWith(props.to);

  return (
    <Link
      {...props}
      className={classNames(
        "w-full text-center py-2 sm:py-3 rounded-t-md text-white flex items-center justify-center space-x-2",
        active ? "bg-gray-200/30" : "bg-gray-200/10",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default SettingsTab;
