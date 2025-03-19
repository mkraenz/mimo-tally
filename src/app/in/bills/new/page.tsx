import { VStack } from "@chakra-ui/react";
import { FC } from "react";
import BillsAppBar from "./BillsAppbar";
import NewBillForm from "./NewBillForm";

type Props = {};

const AddBill: FC<Props> = (props) => {
  return (
    <VStack as={"main"} px={{ md: 12, base: 4 }} gap={8}>
      <BillsAppBar />
      <NewBillForm />
    </VStack>
  );
};

export default AddBill;
