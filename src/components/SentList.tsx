import { FC } from "react";
import { useQuery } from "react-query";
import { IHandshake } from "../interfaces/IHandshake";
import SettingsListItem from "./SettingsListItem";
import SettingsListLoader from "./SettingsListLoader";
import SettingsListNoItem from "./SettingsListNoItem";

const SentList: FC = () => {
  const handshakes = useQuery<IHandshake[]>("/handshakes/sent");
  return (
    <div>
      {handshakes.isLoading ? (
        <SettingsListLoader />
      ) : handshakes.data.length > 0 ? (
        <div className="space-y-2">
          {handshakes.data.map((handshake) => {
            return (
              <SettingsListItem key={handshake.toUser.id}>
                <span>@{handshake.toUser.username}</span>
              </SettingsListItem>
            );
          })}
        </div>
      ) : (
        <SettingsListNoItem />
      )}
    </div>
  );
};

export default SentList;
