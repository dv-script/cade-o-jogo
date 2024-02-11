import { MatchesTable } from "@/app/admin/dashboard/matches/_components/matches-table";
import { Metadata } from "next";

import { getAllMatches } from "@/actions/get-all-matches";
import { IMatchesFromDb } from "@/types/IMatchesFromDb";

export const metadata: Metadata = {
  title: "Cadê o Jogo? - Administrador de Partidas",
  description:
    "Administre e gerencie todas as partidas com controle total sobre criação, edição e exclusão. Acesse informações detalhadas sobre as partidas e execute ações em lote para uma gestão eficiente das partidas.",
};

export default async function Page() {
  const matches = (await getAllMatches()) as IMatchesFromDb[];

  return (
    <div className="flex p-4">
      <div className="mx-auto flex flex-col gap-4 max-w-[1300px] overflow-hidden">
        <div className="bg-zinc-900 flex flex-col rounded-lg p-3 w-full h-full">
          <MatchesTable matches={matches} />
        </div>
      </div>
    </div>
  );
}
