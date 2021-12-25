import { FC } from "react";
import Loading from "./Loading";

const SettingsListLoader: FC = () => {
  return (
    <div className="py-20 text-2xl">
      <Loading />
    </div>
  );
};

export default SettingsListLoader;
