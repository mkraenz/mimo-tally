"use client";

import { ColorModeButton } from "@/components/ui/color-mode";
import { content } from "@/content";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import styles from "./navbar.module.css";

const NavLink: FC<PropsWithChildren<{ href: string; external?: boolean }>> = ({
  children,
  href,
  external = false,
}) => {
  if (external) {
    return (
      <Link href={href} target={"_blank"} referrerPolicy={"no-referrer"}>
        <Text width={"100%"}>{children}</Text>
      </Link>
    );
  }
  return (
    <Link href={href}>
      <Text width={"100%"}>{children}</Text>
    </Link>
  );
};

const iconLookup = {
  github: LuGithub,
  linkedin: LuLinkedin,
};

const NavLinkIcon: FC<{ icon: keyof typeof iconLookup; href: string }> = ({
  icon,
  href,
}) => {
  const Icon = iconLookup[icon];
  return (
    <IconButton variant={"ghost"} asChild>
      <Link href={href} target={"_blank"} rel={"noreferrer"}>
        <Icon />
      </Link>
    </IconButton>
  );
};

const Navbar: FC = () => {
  return (
    <HStack as={"nav"} justifyContent={"space-between"} px={4}>
      <Link href={content.nav.home.href}>
        <Image
          width={108}
          height={36}
          style={{ width: "auto" }}
          alt={content.logo.alt}
          src={content.logo.src}
          className={styles.logo}
        />
      </Link>

      <HStack display={{ base: "none", md: "flex" }}>
        <ColorModeButton />
      </HStack>

      <HStack display={{ base: "flex", md: "none" }}>
        <ColorModeButton />
      </HStack>
    </HStack>
  );
};

export default Navbar;
