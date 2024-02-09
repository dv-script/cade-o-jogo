"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { TbTrash } from "react-icons/tb";
import { deleteUser } from "@/actions/delete-user";
import toast from "react-hot-toast";

interface DeleteUserModalProps {
  firstName: string;
  id: string;
  lastName: string;
}

export function DeleteUserModal({
  firstName,
  id,
  lastName,
}: DeleteUserModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        isIconOnly
        size="sm"
        color="danger"
        variant="flat"
        className="text-lg"
      >
        <TbTrash />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <form action={() => deleteUser(id)}>
              <ModalHeader className="flex flex-col gap-1">
                Edit User
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete {firstName} {lastName}?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  color="primary"
                  onPress={() => {
                    onClose();
                    toast.success(
                      `${firstName} ${lastName} was deleted successfully!`
                    );
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
