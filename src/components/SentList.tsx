import { FC } from "react";
import { useQuery } from "react-query";
import { IHandshake } from "../interfaces/IHandshake";
import HandshakesList from "./HandshakesList";

const SentList: FC = () => {
  const handshakes = useQuery<IHandshake[]>("/handshakes/sent");
  return (
    <HandshakesList
      loading={handshakes.isLoading}
      list={handshakes.data}
      renderItem={(handshake) => {
        return <p>{handshake.toUser.username}</p>;
      }}
    />
  );
};

export default SentList;
