import { Dialog } from "@headlessui/react";
import axios from "axios";
import { FC, FormEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { IHandshake } from "../interfaces/IHandshake";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const HandshakeDialog: FC<Props> = ({ isOpen, onClose }) => {
  const key = "/handshakes/offers";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const sendHandshake = useMutation(
    (username: string) => axios.post<IHandshake>(key, { username }),
    { mutationKey: key }
  );

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const mutationPromise = sendHandshake.mutateAsync(username);
    const { data: handshake } = await mutationPromise;
    queryClient.setQueryData<IHandshake[]>("/handshakes/sent", (prev) =>
      prev ? [...prev, handshake] : [handshake]
    );
    toast.success(`Handshake sent to ${handshake.toUser.username}`);
    navigate("/settings/sent");
    setUsername("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Dialog.Title as="h3" className="text-lg font-medium leading-6">
        New Handshake
      </Dialog.Title>
      <Dialog.Description className="text-sm mt-3">
        Send a handshake request to a user and you will be paired with the user
        once they answer your handshake.
      </Dialog.Description>
      <form onSubmit={handleSubmit} className="mt-6 space-x-2 flex">
        <input
          className="rounded-sm px-4 py-2 bg-gray-600 focus:outline outline-1 outline-blue-600 w-full"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Button
          type="submit"
          className="px-9"
          loading={sendHandshake.isLoading}
          disabled={!Boolean(username)}
        >
          Send
        </Button>
      </form>
    </Modal>
  );
};

export default HandshakeDialog;
