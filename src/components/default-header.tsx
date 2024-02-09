import Link from "next/link";
import Image from "next/image";
import { BsInstagram, BsTwitterX, BsFacebook } from "react-icons/bs";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import paulistaoLogo from "@/assets/paulistaoLogo.png";
import { ChangeChampionshipModal } from "./change-championship-modal";

const socialMediaOptions = [
  {
    id: 1,
    icon: <BsInstagram size={18} />,
    link: "https://www.instagram.com/paulistao",
  },
  {
    id: 2,
    icon: <BsTwitterX size={18} />,
    link: "https://twitter.com/paulistao",
  },
  {
    id: 3,
    icon: <BsFacebook size={18} />,
    link: "https://www.facebook.com/futebolpaulista",
  },
];

export async function DefaultHeader() {
  return (
    <Navbar height='6rem' isBordered>
      <NavbarBrand>
        <Link href="/" className="flex justify-center items-center w-32">
          <Image
            src={paulistaoLogo}
            alt="Paulistão Sicredi Logo"
            width={200}
            height={50}
            className="w-full"
          />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center" className="flex-col gap-0 sm:gap-1 sm:flex-row">
        <NavbarItem>
          <div className="flex items-center">
            {socialMediaOptions.map((socialMedia) => (
              <Button
                as={Link}
                href={socialMedia.link}
                key={socialMedia.id}
                target="_blank"
                isIconOnly
                variant="light"
              >
                {socialMedia.icon}
              </Button>
            ))}
          </div>
        </NavbarItem>
        <NavbarItem>
          <ChangeChampionshipModal />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
