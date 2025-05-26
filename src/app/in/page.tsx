"use client";

import { formatCurrency, formatDateToLocal } from "@/app/common/formatting";
import { amountToColor } from "@/app/lib/amountToColor";
import { Currency } from "@/app/lib/Currency";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { FC } from "react";
import { LuLogOut } from "react-icons/lu";
import { TfiImport } from "react-icons/tfi";
import TallyAppBar from "./TallyAppbar";

type TallyItemProps = {
  purpose: string;
  date: string;
  amount: number;
  currency: Currency;
  separator: boolean;
};

type TallyTotalProps = { amount: number; currency: Currency };

const TallyTotal: FC<TallyTotalProps> = ({ amount, currency }) => {
  return (
    <HStack width={"full"} justify={"space-between"} fontWeight={"bold"}>
      <Text>Total</Text>
      <Text color={amountToColor(amount)}>
        {formatCurrency("de-DE", amount, currency)}
      </Text>
    </HStack>
  );
};

const TallyItem: FC<TallyItemProps> = ({
  purpose,
  date,
  amount,
  currency,
  separator,
}) => (
  <>
    <HStack w={"full"} justify={"space-between"}>
      <HStack gap={8}>
        {/* the box stops the icon from shrinking when the purpose text is too long */}
        <Box>
          <TfiImport />
        </Box>
        <VStack align={"start"} gap={0}>
          <Text lineClamp={1}>{purpose}</Text>
          <Text color={"fg.muted"}>{formatDateToLocal(date)}</Text>
        </VStack>
      </HStack>
      <Text color={amountToColor(amount)}>
        {formatCurrency("de-DE", amount, currency)}
      </Text>
    </HStack>
    {separator && <Separator width={"full"} />}
  </>
);

type Bill = {
  purpose: string;
  currency: Currency;
  amount: number;
  date: string;
  id: string;
};
const bills: Bill[] = [
  {
    id: "1",
    amount: 23.53,
    currency: "EUR",
    date: "2025-03-07T11:13:51.000Z",
    purpose: "Weihnachtsmarkt",
  },
  {
    id: "2",
    amount: -53.84,
    currency: "EUR",
    date: "2025-02-12T21:51:52.000Z",
    purpose: "Food",
  },
  {
    id: "3",
    amount: 362,
    currency: "JPY",
    date: "2025-02-19T21:51:52.000Z",
    purpose: "Food",
  },
  {
    id: "4",
    amount: -9.12,
    currency: "EUR",
    date: "2025-02-25T21:51:52.000Z",
    purpose: "Kino",
  },
];

const TallyPage = () => {
  const { getToken } = useAuth();

  const totalAmountDue = { amount: -26.21, currency: "EUR" as Currency };
  const logJwt = async () => {
    const token = await getToken();
    console.log("JWT Token:", token);
  };
  return (
    <VStack as={"main"} px={{ md: 12, base: 4 }} gap={8}>
      <TallyAppBar
        amountDue={totalAmountDue}
        payButtonDisabled={totalAmountDue.amount >= 0}
      />
      <VStack width={{ md: "md", base: "xs" }}>
        <TallyTotal
          amount={totalAmountDue.amount}
          currency={totalAmountDue.currency}
        />
        <Separator size={"lg"} w={"full"} />
        <VStack gap={1} p={0} width={{ md: "md", base: "xs" }}>
          {bills.map((d, i) => (
            <TallyItem {...d} key={d.id} separator={i !== bills.length - 1} />
          ))}
        </VStack>
      </VStack>
      <Button w={"xs"} asChild>
        <Link href={"/in/bills/new"}>Add bill</Link>
      </Button>
      <Button w={"xs"} onClick={logJwt}>
        Log JWT
      </Button>
      <Box mt={"auto"} alignSelf={"start"}>
        <SignOutButton>
          <IconButton aria-label={"sign out"} variant={"outline"}>
            <LuLogOut />
          </IconButton>
        </SignOutButton>
      </Box>
    </VStack>
  );
};

export default TallyPage;
