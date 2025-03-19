"use client";

import { ColorModeButton } from "@/components/ui/color-mode";
import { content } from "@/content";
import { HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styles from "./navbar.module.css";

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
