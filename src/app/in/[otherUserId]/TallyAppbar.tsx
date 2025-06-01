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
import { formatCurrency } from "../../common/formatting";
import { useParams } from "next/navigation";
import {
  useApiFetchCreateSettlement,
  useApiFetchUserMe,
} from "@/hooks/api/useApiFetch";

type SettleDialogProps = PropsWithChildren & {
  amountDue: { amount: number; currency: Currency };
  receiver: string;
  affectedDisbursementIds: string[];
};

const SettleDialog: FC<SettleDialogProps> = ({
  children,
  amountDue,
  receiver,
  affectedDisbursementIds: settledDisbursementIds,
}) => {
  const { otherUserId } = useParams<{ otherUserId: string }>();
  const fetchMe = useApiFetchUserMe();
  const createSettlement = useApiFetchCreateSettlement();

  const handlePayment = async () => {
    const me = await fetchMe();
    await createSettlement({
      method: "POST",
      body: JSON.stringify({
        settled_disbursement_ids: settledDisbursementIds,
        receiving_party_id: otherUserId,
        sending_party_id: me.id,
        settled_at: new Date().toISOString(),
        amount_paid: Math.abs(amountDue.amount),
        currency: amountDue.currency,
      }),
    });
    window.location.reload();
  };

  const { amount, currency } = amountDue;
  const formattedAmount = formatCurrency("de-DE", Math.abs(amount), currency);

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
                  <Button w={"xs"} onClick={handlePayment}>
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
  affectedDisbursementIds: string[];
};
const TallyAppBar: FC<AppBarProps> = ({
  payButtonDisabled,
  amountDue,
  affectedDisbursementIds,
}) => {
  const { otherUserId } = useParams<{ otherUserId: string }>();

  const person = "Miro";

  return (
    <HStack justify={"space-between"} width={"100%"}>
      <Heading>Yours and {person}&apos;s tally</Heading>

      <HStack>
        <SettleDialog
          amountDue={amountDue}
          receiver={"Miro"}
          affectedDisbursementIds={affectedDisbursementIds}
        >
          <IconButton variant={"outline"} disabled={payButtonDisabled}>
            <LuScale />
          </IconButton>
        </SettleDialog>

        <IconButton asChild variant={"outline"}>
          <Link href={`/in/${otherUserId}/bills/new`}>
            <LuPlus />
          </Link>
        </IconButton>
      </HStack>
    </HStack>
  );
};

export default TallyAppBar;
