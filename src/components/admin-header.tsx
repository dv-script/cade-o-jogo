import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import paulistaoLogo from "@/assets/paulistaoLogo.png";
import { UserProfile } from "./user-profile";
import { auth } from "@/app/auth/providers";

export async function AdminHeader() {
  const session = await auth();

  return (
    <Navbar height="6rem" isBordered>
      <NavbarBrand>
        <Link href="/admin" className="flex justify-center items-center w-32">
          <Image
            src={paulistaoLogo}
            alt="Paulistão Sicredi Logo"
            width={200}
            height={50}
            className="w-full"
          />
        </Link>
      </NavbarBrand>
      <NavbarContent
        justify="center"
        className="flex-col gap-0 sm:gap-1 sm:flex-row"
      >
        <NavbarItem>
          {session?.user ? (
            <UserProfile
              firstName={session?.user?.firstName}
              lastName={session?.user?.lastName}
            />
          ) : (
            <Button as={Link} href="/auth/sign-in" variant="faded">
              Entrar
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
