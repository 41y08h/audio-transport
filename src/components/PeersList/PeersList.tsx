import { FC } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../contexts/AuthContext";
import { IPeer } from "../../interfaces/IPeer";
import socket from "../../RTCs/socket";

const PeersList: FC = () => {
  const peersQuery = useQuery<IPeer[]>("/peers");
  const { currentUser } = useAuth();

  const callPeer = (username: string) => {
    socket.emit("callPeer", { username });
  };

  return (
    <div>
      {peersQuery.isLoading ? (
        <p>Loading Peers...</p>
      ) : (
        <div>
          {peersQuery.data.map((peer) => {
            const username =
              peer.userId === currentUser.id
                ? peer.peer.username
                : peer.user.username;

            return (
              <div key={peer.peer.username + peer.user.username}>
                <p>{username}</p>
                <button onClick={() => callPeer(username)}>Call</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PeersList;
