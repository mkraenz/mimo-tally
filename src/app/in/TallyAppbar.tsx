"use client";

import { Currency } from "@/app/lib/Currency";
import {
  Button,
  Dialog,
  Heading,
  HStack,
  IconButton,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { LuPlus, LuScale, LuX } from "react-icons/lu";
import { formatCurrency } from "../common/formatting";

type SettleDialogProps = PropsWithChildren & {
  amountDue: { amount: number; currency: Currency };
  receiver: string;
};

const SettleDialog: FC<SettleDialogProps> = ({
  children,
  amountDue,
  receiver,
}) => {
  const { amount, currency } = amountDue;

  const formattedAmount = formatCurrency("de-DE", -amount, currency);

  return (
    <Dialog.Root placement={"center"}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <HStack justify={"space-between"}>
                <Dialog.Title>Settle the tally</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <IconButton variant={"outline"} aria-label={"close dialog"}>
                    <LuX />
                  </IconButton>
                </Dialog.CloseTrigger>
              </HStack>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap={8}>
                <Text>
                  Please pay the following amount to {receiver} and confirm your
                  payment below.
                </Text>
                <Text textAlign={"center"} fontSize={"xl"}>
                  {formattedAmount}
                </Text>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <VStack w={"full"}>
                <Dialog.ActionTrigger asChild>
                  <Button w={"xs"}>
                    I have paid {formattedAmount} to {receiver}.
                  </Button>
                </Dialog.ActionTrigger>
                <Dialog.CloseTrigger asChild>
                  <Button w={"xs"} variant={"outline"}>
                    Not now
                  </Button>
                </Dialog.CloseTrigger>
              </VStack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

type AppBarProps = {
  payButtonDisabled: boolean;
  amountDue: { amount: number; currency: Currency };
};
const TallyAppBar: FC<AppBarProps> = ({
  payButtonDisabled,
  amountDue,
}) => {
  const person = "Miro";

  return (
    <HStack justify={"space-between"} width={"100%"}>
      <Heading>Yours and {person}&apos;s tally</Heading>

      <HStack>
        <SettleDialog amountDue={amountDue} receiver={"Miro"}>
          <IconButton variant={"outline"} disabled={payButtonDisabled}>
            <LuScale />
          </IconButton>
        </SettleDialog>

        <IconButton asChild variant={"outline"}>
          <Link href={"/in/bills/new"}>
            <LuPlus />
          </Link>
        </IconButton>
      </HStack>
    </HStack>
  );
};

export default TallyAppBar;
