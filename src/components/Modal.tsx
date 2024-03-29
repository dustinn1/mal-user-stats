import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

type Props = {
  title: string;
  description: string;
  button: {
    text: string;
    icon: IconDefinition;
  };
  actionButton: {
    text: string;
    onClick: () => void;
  };
};

export default function Modal({
  title,
  description,
  button,
  actionButton,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button
        text={button.text}
        startIcon={button.icon}
        size="lg"
        onClick={handleOpen}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          initialFocus={modalRef}
          as="div"
          className="relative z-10"
          onClose={handleClose}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto" ref={modalRef}>
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
                  <Dialog.Title
                    as="h2"
                    className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-gray-500 dark:text-gray-300">
                      {description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      text={actionButton.text}
                      startIcon={button.icon}
                      size="sm"
                      onClick={actionButton.onClick}
                    />
                    <Button text="Close" size="sm" onClick={handleClose} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
