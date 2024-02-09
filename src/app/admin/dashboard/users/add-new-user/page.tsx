import { AddANewUserForm } from "@/app/admin/dashboard/users/add-new-user/_components/add-a-new-user-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadê o Jogo? - Adicionar novo usuário",
  description:
    "Adicione um novo usuário ao sistema para que ele possa acessar e gerenciar partidas e usuários.",
};

export default function AddANewUser() {
  return (
    <div className="flex justify-center items-center py-16">
      <AddANewUserForm />
    </div>
  );
}
