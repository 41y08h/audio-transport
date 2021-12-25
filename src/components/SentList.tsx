import { FC } from "react";
import { useQuery } from "react-query";
import { IHandshake } from "../interfaces/IHandshake";
import Loading from "./Loading";

const SentList: FC = () => {
  const handshakes = useQuery<IHandshake[]>("/handshakes/sent");
  return (
    <div>
      {handshakes.isLoading ? (
        <div className="py-20 text-2xl">
          <Loading />
        </div>
      ) : (
        handshakes.data.map((handshake) => {
          return <p>{handshake.toUser.username}</p>;
        })
      )}
    </div>
  );
};

export default SentList;
