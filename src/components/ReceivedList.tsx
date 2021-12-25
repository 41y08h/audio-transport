import axios from "axios";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { IHandshake } from "../interfaces/IHandshake";
import Button from "./Button";
import { IPeer } from "../interfaces/IPeer";
import SettingsListLoader from "./SettingsListLoader";
import SettingsListNoItem from "./SettingsListNoItem";
import SettingsListItem from "./SettingsListItem";

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
    <div>
      {handshakes.isLoading ? (
        <SettingsListLoader />
      ) : handshakes.data.length > 0 ? (
        <div className="space-y-2">
          {handshakes.data.map((handshake) => {
            const username = handshake.fromUser.username;
            return (
              <SettingsListItem key={handshake.toUser.id}>
                <span>@{handshake.fromUser.username}</span>
                <Button
                  onClick={() => answerHandshake.mutate({ username })}
                  loading={answerHandshake.isLoading}
                >
                  Answer
                </Button>
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

export default ReceivedList;
