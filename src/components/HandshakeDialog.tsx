import { Transition, Dialog } from "@headlessui/react";
import axios from "axios";
import { FC, FormEventHandler, Fragment, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { IHandshake } from "../interfaces/IHandshake";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

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

  function cleanup() {
    setUsername("");
    sendHandshake.reset();
  }

  return (
    <Transition appear show={isOpen} as={Fragment} afterLeave={cleanup}>
      <Dialog
        className="fixed inset-0 h-screen w-screen flex justify-center items-center text-white z-10 backdrop-blur-sm"
        onClose={sendHandshake.isLoading ? () => {} : onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
        </Transition.Child>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="transform scale-0"
          enterTo="transform scale-100"
          leave="ease-in duration-200"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-0"
        >
          <div className=" text-white bg-gray-800 p-6 rounded-sm w-full max-w-lg relative">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6">
              New Handshake
            </Dialog.Title>
            <Dialog.Description className="text-sm mt-3">
              Send a handshake request to a user and you will be paired with the
              user once they answer your handshake.
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
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default HandshakeDialog;
