import axios from "axios";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { IHandshake } from "../../interfaces/IHandshake";

const HandshakesList: FC = () => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const handshakesQuery = useQuery<IHandshake[]>("/handshakes/offers");
  const answerHandshakeMutation = useMutation(
    ({ username }: { username: string }) =>
      axios.post("/handshakes/answer", { username }),
    {
      onSuccess(data, { username }) {
        queryClient.setQueryData<IHandshake[]>(
          "/handshakes/offers",
          (handshakes) =>
            handshakes.filter(
              (handshake) => handshake.fromUser.username !== username
            )
        );

        toast.success("Handshake answered");
      },
    }
  );

  return (
    <div>
      {handshakesQuery.isLoading ? (
        <p>Loading Handshakes...</p>
      ) : (
        handshakesQuery.data.map((handshake) => {
          const isHandshakeSent = handshake.fromUser.id === currentUser.id;
          const username = isHandshakeSent
            ? handshake.toUser.username
            : handshake.fromUser.username;

          return (
            <div>
              {isHandshakeSent ? "⬆️" : "⬇️"} {username}
              {!isHandshakeSent && (
                <button
                  onClick={() => answerHandshakeMutation.mutate({ username })}
                  disabled={answerHandshakeMutation.isLoading}
                >
                  Answer
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default HandshakesList;
