import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
  Card,
  CardBody,
} from "@nextui-org/react";
import { LuSettings, LuUserCircle } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import { UserLogout } from "./user-logout";

interface UserProfileProps {
  firstName: string;
  lastName: string;
}

export function UserProfile({ firstName, lastName }: UserProfileProps) {
  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <User
          as="button"
          name={`${firstName} ${lastName}`}
          description="Livemode"
          className="transition-transform text-ellipsis whitespace-nowrap overflow-hidden"
          avatarProps={{
            radius: "full",
            name: firstName + lastName,
            color: "primary",
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <Card
          shadow="none"
          className="max-w-[300px] min-w-44 border-none bg-transparent"
        >
          <CardBody className="p-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-left rounded-lg px-4 py-2 transition-all hover:bg-slate-700 hover:text-blue-500"
            >
              <MdOutlineSpaceDashboard />
              Dashboard
            </Link>
            <Link
              href="/admin/user/edit-profile"
              className="flex items-center gap-2 text-left rounded-lg px-4 py-2 transition-all hover:bg-slate-700 hover:text-blue-500"
            >
              <LuUserCircle />
              Edit profile
            </Link>
            <Link
              href="/admin/user/settings/change-your-password"
              className="flex items-center gap-2 text-left rounded-lg px-4 py-2 transition hover:bg-slate-700 hover:text-blue-500"
            >
              <LuSettings />
              Settings
            </Link>
            <UserLogout />
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
