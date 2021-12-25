import { FC } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../contexts/AuthContext";
import { IPeer } from "../interfaces/IPeer";
import SettingsListItem from "./SettingsListItem";
import SettingsListLoader from "./SettingsListLoader";
import SettingsListNoItem from "./SettingsListNoItem";

const PairedList: FC = () => {
  const pairings = useQuery<IPeer[]>("/peers");
  const { currentUser } = useAuth();

  return (
    <div>
      {pairings.isLoading ? (
        <SettingsListLoader />
      ) : pairings.data.length > 0 ? (
        <div className="space-y-2">
          {pairings.data.map((pair) => {
            const username =
              pair.user.username === currentUser.username
                ? pair.peer.username
                : pair.user.username;
            return (
              <SettingsListItem key={`${pair.user.id}${pair.peer.id}`}>
                <span>@{username}</span>
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

export default PairedList;
