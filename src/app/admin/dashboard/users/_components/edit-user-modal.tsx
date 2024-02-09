"use client";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { PiPencilLine } from "react-icons/pi";
import { EditUserForm } from "./edit-user-form";

interface IUser {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    updatedBy: string;
  };
}

export function EditUserModal({ user }: IUser) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        isIconOnly
        size="sm"
        variant="flat"
        className="text-lg text-default-500"
      >
        <PiPencilLine />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        size="lg"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => <EditUserForm user={user} onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  );
}
