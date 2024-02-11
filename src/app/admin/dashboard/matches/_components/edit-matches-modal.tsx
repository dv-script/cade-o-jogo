"use client";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { PiPencilLine } from "react-icons/pi";
import { EditMatchesForm } from "./edit-matches-form";

interface IMatch {
  match: {
    id: string;
    idMatch: number;
    hboMax: string;
    canalTnt: string;
    playPlus: string;
    canalRecord: string;
    cazeTv: string;
    paulistaoPlay: string;
    camisa21: string;
    futebolPaulista: string;
    canalFutura: string;
    paulistao: string;
    sportv: string;
    globo: string;
    premiere: string;
    round: number;
    teamHome: string;
    teamAway: string;
  };
}

export function EditMatchesModal({ match }: IMatch) {
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
          {(onClose) => <EditMatchesForm match={match} onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  );
}
