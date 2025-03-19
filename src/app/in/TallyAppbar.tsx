"use client";

import { Currency } from "@/app/lib/Currency";
import { Heading, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { LuPlus, LuScale } from "react-icons/lu";

type AppBarProps = {
  payButtonDisabled: boolean;
  totalAmountDue: { amount: number; currency: Currency };
};
const TallyAppBar: FC<AppBarProps> = ({ payButtonDisabled }) => {
  const person = "Miro";

  const { onClose, onOpen } = useDisclosure();

  return (
    <HStack justify={"space-between"} width="100%">
      <Heading>Yours and {person}'s tally</Heading>

      <HStack>
        <IconButton variant={"outline"} disabled={payButtonDisabled}>
          <LuScale />
        </IconButton>

        <IconButton asChild variant={"outline"}>
          <Link href="/in/bills/new">
            <LuPlus />
          </Link>
        </IconButton>
      </HStack>
    </HStack>
  );
};

export default TallyAppBar;
