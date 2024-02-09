import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="background w-full flex p-6">
      <div className="max-w-[1300px] w-full flex jus gap-2 mx-auto">
        <Button as={Link} href="/admin/dashboard/users" color="primary">
          Usuários
        </Button>
        <Button as={Link} href="/admin/dashboard/matches" color="primary">
          Partidas
        </Button>
      </div>
    </main>
  );
}
