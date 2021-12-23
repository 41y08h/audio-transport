import { FC } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../contexts/AuthContext";
import { IPeer } from "../../interfaces/IPeer";

interface Props {
  callPeer: (username: string) => void;
}

const PeersList: FC<Props> = ({ callPeer }) => {
  const peersQuery = useQuery<IPeer[]>("/peers");
  const { currentUser } = useAuth();

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
