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
import { SignOutButton } from "@clerk/nextjs";
import { round } from "lodash";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { TfiExport, TfiImport } from "react-icons/tfi";
import { useApiFetchDisbursementsWithUser } from "../../../hooks/api/useApiFetch";
import TallyAppBar from "./TallyAppbar";

type TallyItemProps = {
  purpose: string;
  date: string;
  amount: number;
  otherUserIsPaying: boolean;
  currency: Currency;
  separator: boolean;
};

type TallyTotalProps = { amount: number; currency: Currency };

const TallyTotal: FC<TallyTotalProps> = ({ amount, currency }) => {
  return (
    <HStack width={"full"} justify={"space-between"} fontWeight={"bold"}>
      <Text>Total</Text>
      {amount === 0 ? (
        <Text>You and X are even.</Text>
      ) : (
        <Text color={amountToColor(amount)}>
          {amount >= 0 ? "X owes you " : "You owe X "}
          {formatCurrency("de-DE", Math.abs(amount), currency)}
        </Text>
      )}
    </HStack>
  );
};

const TallyItem: FC<TallyItemProps> = ({
  purpose,
  date,
  amount,
  currency,
  separator,
  otherUserIsPaying,
}) => (
  <>
    <HStack w={"full"} justify={"space-between"}>
      <HStack gap={8}>
        {/* the box stops the icon from shrinking when the purpose text is too long */}
        <Box>{otherUserIsPaying ? <TfiExport /> : <TfiImport />}</Box>
        <VStack align={"start"} gap={0}>
          <Text lineClamp={1}>{purpose}</Text>
          <Text color={"fg.muted"}>{formatDateToLocal(date)}</Text>
        </VStack>
      </HStack>
      <Text color={amountToColor(amount, otherUserIsPaying)}>
        {formatCurrency(
          "de-DE",
          otherUserIsPaying ? -amount : amount,
          currency,
        )}
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
  payingPartyId: string;
};

const TallyPage = () => {
  const { otherUserId } = useParams<{ otherUserId: string }>();
  const [bills, setBills] = useState<Bill[]>([]);
  const fetchDisbursements = useApiFetchDisbursementsWithUser(otherUserId);
  useEffect(() => {
    const fetchBills = async () => {
      const data = await fetchDisbursements();
      const formattedBills = data.data.map((d) => ({
        id: d.id,
        amount: d.amount_paid.amount,
        currency: d.amount_paid.currency as Currency,
        date: d.created_at,
        purpose: d.comment,
        payingPartyId: d.paying_party_id,
      }));
      setBills(formattedBills);
    };
    fetchBills();
  }, [fetchDisbursements]);

  const totalAmountDue = useMemo(
    () => ({
      amount: round(
        bills.reduce((acc, next) => {
          if (next.payingPartyId === otherUserId) return acc - next.amount;
          return acc + next.amount;
        }, 0),
        2,
      ),
      currency: "EUR" as Currency,
    }),
    [bills, otherUserId],
  );
  return (
    <VStack as={"main"} px={{ md: 12, base: 4 }} gap={8}>
      <TallyAppBar
        amountDue={totalAmountDue}
        payButtonDisabled={totalAmountDue.amount >= 0}
        affectedDisbursementIds={bills.map((d) => d.id)}
      />
      <VStack width={{ md: "md", base: "xs" }}>
        <TallyTotal
          amount={totalAmountDue.amount}
          currency={totalAmountDue.currency}
        />
        <Separator size={"lg"} w={"full"} />
        <VStack gap={1} p={0} width={{ md: "md", base: "xs" }}>
          {bills.map((d, i) => (
            <TallyItem
              {...d}
              key={d.id}
              separator={i !== bills.length - 1}
              otherUserIsPaying={d.payingPartyId === otherUserId}
            />
          ))}
        </VStack>
      </VStack>
      <Button w={"xs"} asChild mt={"auto"}>
        <Link href={`/in/${otherUserId}/bills/new`}>Add bill</Link>
      </Button>
      <Box alignSelf={"start"}>
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
