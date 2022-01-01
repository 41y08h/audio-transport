import { Transition, Dialog } from "@headlessui/react";
import { FC, Fragment } from "react";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({ isOpen = false, onClose, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        className="fixed inset-0 h-screen w-screen flex justify-center items-center text-white z-10 backdrop-blur-sm"
        onClose={onClose}
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
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
