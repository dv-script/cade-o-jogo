"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { PiTrophy } from "react-icons/pi";
import { IoFootball } from "react-icons/io5";
import Link from "next/link";

const championshipsOptions = [
  { id: 1, label: "Paulistão Sicredi 2024", value: "935" },
  {
    id: 2,
    label: "Paulistão A2 Sicredi 2024",
    value: "",
  },
];

export function ChangeChampionshipModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} startContent={<PiTrophy />} variant="bordered">
        Selecione<span className="hidden xs:block">o campeonato</span>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        radius="lg"
        backdrop="blur"
        classNames={{
          body: "py-6",
          base: "border-[1px] border-[#292f46] bg-zinc-900 dark:bg-[#000] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        size="lg"
        scrollBehavior="outside"
      >
        <ModalContent>
          <ModalHeader className="flex items-center gap-2">
            <IoFootball />
            <span>Selecione o campeonato:</span>
          </ModalHeader>
          <ModalBody>
            {championshipsOptions.map((championship) => (
              <Button
                as={Link}
                href={championship.value}
                variant="bordered"
                className="border-[#292f46] dark:border-[#292f46]"
                key={championship.id}
              >
                {championship.label}
              </Button>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
