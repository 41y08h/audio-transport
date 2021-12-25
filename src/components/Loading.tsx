import classNames from "classnames";
import { FC } from "react";
import { IconBaseProps } from "react-icons/lib";
import { VscLoading } from "react-icons/vsc";

const Loading: FC<IconBaseProps> = ({ className, ...props }) => {
  return (
    <VscLoading
      {...props}
      className={classNames("animate-spin mx-auto", className)}
    />
  );
};

export default Loading;
