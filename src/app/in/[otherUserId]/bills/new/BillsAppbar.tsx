"use client";

import { Heading, HStack, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { LuChevronLeft } from "react-icons/lu";

const BackButton = () => {
  const router = useRouter();

  return (
    <IconButton
      asChild
      variant={"ghost"}
      aria-label={"back"}
      onClick={() => router.back()}
    >
      <LuChevronLeft />
    </IconButton>
  );
};

const BillsAppBar: FC = () => {
  return (
    <HStack width={"100%"}>
      <BackButton />
      <Heading>Add bill</Heading>
    </HStack>
  );
};

export default BillsAppBar;
