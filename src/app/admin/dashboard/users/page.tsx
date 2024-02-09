import { UsersTable } from "@/app/admin/dashboard/users/_components/users-table";
import { Metadata } from "next";
import { IUser } from "@/types/IUser";
import { getAllUsers } from "@/actions/get-all-users";

export const metadata: Metadata = {
  title: "FPF - User Management Dashboard",
  description:
    "Administrate and manage all user accounts with full control over creation, editing, and deletion. Access detailed user information and perform batch actions for efficient user management.",
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
