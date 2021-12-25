import classNames from "classnames";
import { FC } from "react";

const SettingsListItem: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => (
  <div
    {...props}
    className={classNames(
      "bg-gray-100/20 p-3 flex justify-between items-center",
      props.className
    )}
  />
);

export default SettingsListItem;
