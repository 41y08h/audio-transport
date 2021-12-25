import classNames from "classnames";
import { FC } from "react";
import { Link, LinkProps, useMatch } from "react-router-dom";

type Props = LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    to: string;
  };

const SettingsTab: FC<Props> = ({ children, className, ...props }) => {
  const path = props.to.startsWith("/settings")
    ? props.to
    : `/settings/${props.to}`;

  const active = useMatch(path);

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
