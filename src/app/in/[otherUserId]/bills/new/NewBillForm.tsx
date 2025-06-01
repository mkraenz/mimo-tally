"use client";

import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { useApiFetch, useApiFetchUserMe } from "@/hooks/api/useApiFetch";
import { Button, Fieldset, Input, NativeSelect } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { FC, FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type={"submit"}
      width={"xs"}
      loading={pending}
      mx={"auto"}
      mt={"auto"}
    >
      Submit
    </Button>
  );
};

const CurrencySelect: FC<{
  setValue: (val: string) => void;
  value: string;
}> = ({ setValue, value }) => (
  <NativeSelect.Root size={"xs"} variant={"plain"} width={"auto"} me={"-1"}>
    <NativeSelect.Field
      defaultValue={"EUR"}
      value={value}
      fontSize={"sm"}
      onChange={(e) => setValue(e.currentTarget.value)}
    >
      <option value={"EUR"}>€</option>
      <option value={"JPY"}>¥</option>
    </NativeSelect.Field>
    <NativeSelect.Indicator />
  </NativeSelect.Root>
);

const NewBillForm = () => {
  const router = useRouter();
  const { otherUserId } = useParams<{ otherUserId: string }>();
  const [purpose, setPurpose] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [amount, setAmount] = useState<number>();
  const createDisbursement = useApiFetch("/api/v1/disbursements");
  const fetchMe = useApiFetchUserMe();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const me = await fetchMe();
    await createDisbursement({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        paying_party_id: me.id,
        on_behalf_of_party_id: otherUserId,
        comment: purpose,
        amount_paid: {
          amount,
          currency,
        },
      }),
    });
    router.replace(`/in/${otherUserId}`);
  };
  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root size={"lg"} maxW={"md"} w={"xs"} height={"75svh"}>
        <Fieldset.HelperText>
          Please provide some details about what you have paid.
        </Fieldset.HelperText>

        <Fieldset.Content>
          <Field label={"Amount"}>
            <InputGroup
              flex={"1"}
              w={"100%"}
              endElement={
                <CurrencySelect setValue={setCurrency} value={currency} />
              }
            >
              <Input
                name={"amount"}
                autoComplete={"off"}
                required
                type={"number"}
                placeholder={"0.00"}
                step={".01"}
                value={amount}
                onChange={(e) =>
                  setAmount(Number.parseFloat(e.currentTarget.value))
                }
              />
            </InputGroup>
          </Field>
          <Field label={"Purpose"}>
            <InputGroup flex={"1"} w={"100%"}>
              <Input
                name={"purpose"}
                placeholder={"food"}
                required
                value={purpose}
                onChange={(e) => setPurpose(e.currentTarget.value)}
              />
            </InputGroup>
          </Field>
        </Fieldset.Content>

        <SubmitButton />
      </Fieldset.Root>
    </form>
  );
};

export default NewBillForm;
