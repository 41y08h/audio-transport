import axios from "axios";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { IHandshake } from "../interfaces/IHandshake";
import Button from "./Button";
import { IPeer } from "../interfaces/IPeer";
import HandshakesList from "./HandshakesList";

const ReceivedList: FC = () => {
  const queryClient = useQueryClient();
  const handshakes = useQuery<IHandshake[]>("/handshakes/received");
  const answerHandshake = useMutation(
    ({ username }: { username: string }) =>
      axios.post<IPeer>("/handshakes/answer", { username }),
    {
      onSuccess(res, { username }) {
        // Remove received handshake from the list
        queryClient.setQueryData<IHandshake[]>(
          "/handshakes/received",
          (handshakes) =>
            handshakes.filter(
              (handshake) => handshake.fromUser.username !== username
            )
        );

        // Add received pair to the paired list
        queryClient.setQueryData<IPeer[]>("/peers", (peers) =>
          peers ? [...peers, res.data] : [res.data]
        );

        toast.success(`Answered handshake from ${username}`);
      },
    }
  );

  return (
    <HandshakesList
      loading={handshakes.isLoading}
      list={handshakes.data}
      renderItem={(handshake) => {
        const username = handshake.fromUser.username;
        return (
          <div
            key={`${handshake.fromUser.id}${handshake.toUser.id}`}
            className="bg-gray-100/20 p-3 flex justify-between items-center"
          >
            <span>@{handshake.fromUser.username}</span>
            <Button
              onClick={() => answerHandshake.mutate({ username })}
              loading={answerHandshake.isLoading}
            >
              Answer
            </Button>
          </div>
        );
      }}
    />
  );
};

export default ReceivedList;
