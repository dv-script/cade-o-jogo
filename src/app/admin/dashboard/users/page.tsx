import { UsersTable } from "./_components/users-table";
import { Metadata } from "next";
import { IUser } from "@/types/IUser";
import { getAllUsers } from "@/actions/get-all-users";

export const metadata: Metadata = {
  title: "Cadê o Jogo? - Administrador de Usuários",
  description:
    "Administre e gerencie todos os usuários com controle total sobre criação, edição e exclusão. Acesse informações detalhadas sobre os usuários e execute ações em lote para uma gestão eficiente dos usuários.",
};

export default async function Page() {
  const users = (await getAllUsers()) as IUser[];

  return (
    <div className="flex p-4">
      <div className="mx-auto flex flex-col gap-4 max-w-[1300px] overflow-hidden">
        <div className="bg-zinc-900 flex flex-col rounded-lg p-3 w-full h-full">
          <UsersTable users={users} />
        </div>
      </div>
    </div>
  );
}
