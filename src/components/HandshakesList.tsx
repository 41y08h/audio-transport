import axios from "axios";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { IHandshake } from "../interfaces/IHandshake";
import Loading from "./Loading";

const HandshakesList: FC = () => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const handshakes = useQuery<IHandshake[]>("/handshakes/received");
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
      {handshakes.isLoading ? (
        <div className="py-20 text-2xl">
          <Loading />
        </div>
      ) : (
        handshakes.data.map((handshake) => {
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
