import { FC } from "react";
import { useQuery } from "react-query";
import { IPeer } from "../interfaces/IPeer";
import SettingsListLoader from "./SettingsListLoader";
import SettingsListNoItem from "./SettingsListNoItem";
import PairItem from "./PairItem";

const PairedList: FC = () => {
  const pairings = useQuery<IPeer[]>("/peers");

  return (
    <div>
      {pairings.isLoading ? (
        <SettingsListLoader />
      ) : pairings.data.length > 0 ? (
        <div className="space-y-2">
          {pairings.data.map((pair) => (
            <PairItem key={`${pair.user.id}${pair.peer.id}`} pair={pair} />
          ))}
        </div>
      ) : (
        <SettingsListNoItem />
      )}
    </div>
  );
};

export default PairedList;
