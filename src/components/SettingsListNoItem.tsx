import { ImFileEmpty } from "react-icons/im";

const SettingsListNoItem = () => {
  return (
    <div className="text-center py-20 flex justify-center items-center space-x-2">
      <ImFileEmpty /> <p>Empty</p>
    </div>
  );
};

export default SettingsListNoItem;
