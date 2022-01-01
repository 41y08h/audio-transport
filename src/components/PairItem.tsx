import { Dialog } from "@headlessui/react";
import { FC, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";
import { IPeer } from "../interfaces/IPeer";
import Button from "./Button";
import Modal from "./Modal";
import SettingsListItem from "./SettingsListItem";

interface Props {
  pair: IPeer;
}

const PairItem: FC<Props> = ({ pair }) => {
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  }

  const username =
    pair.user.username === currentUser.username
      ? pair.peer.username
      : pair.user.username;
  return (
    <SettingsListItem>
      <span>@{username}</span>
      <Button onClick={toggleModal}>
        <BiPencil />
      </Button>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <Dialog.Title as="h3" className="text-lg font-medium leading-6">
          Edit Pair
        </Dialog.Title>
      </Modal>
    </SettingsListItem>
  );
};

export default PairItem;
