"use client";

import createBill from "@/app/lib/actions/createBill";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { Button, Fieldset, Input, NativeSelect } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type={"submit"}
      width={{ base: "full", md: "200px" }}
      loading={pending}
      mt={"auto"}
    >
      Submit
    </Button>
  );
};

const CurrencySelect = () => (
  <NativeSelect.Root size={"xs"} variant={"plain"} width={"auto"} me={"-1"}>
    <NativeSelect.Field defaultValue={"EUR"} fontSize={"sm"}>
      <option value={"EUR"}>€</option>
      <option value={"JPY"}>¥</option>
    </NativeSelect.Field>
    <NativeSelect.Indicator />
  </NativeSelect.Root>
);

const NewBillForm = () => {
  return (
    <form action={createBill}>
      <Fieldset.Root size={"lg"} maxW={"md"} w={"xs"} height={"75svh"}>
        <Fieldset.HelperText>
          Please provide some details about what you have paid.
        </Fieldset.HelperText>

        <Fieldset.Content>
          <Field label={"Amount"}>
            <InputGroup flex={"1"} w={"100%"} endElement={<CurrencySelect />}>
              <Input
                name={"amount"}
                autoComplete={"off"}
                required
                type={"number"}
                placeholder={"0.00"}
                step={".01"}
              />
            </InputGroup>
          </Field>
          <input type={"hidden"} name={"currency"} value={"EUR"} />
          <Field label={"Purpose"}>
            <InputGroup flex={"1"} w={"100%"}>
              <Input name={"purpose"} placeholder={"food"} required />
            </InputGroup>
          </Field>
        </Fieldset.Content>

        <SubmitButton />
      </Fieldset.Root>
    </form>
  );
};

export default NewBillForm;
