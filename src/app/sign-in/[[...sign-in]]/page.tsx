import { VStack } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";
import { FC } from "react";

const LoginForm: FC = () => {
  return (
    <VStack gap={16} minH={"80svh"} justify={"center"} as={"article"}>
      <SignIn />
    </VStack>
  );
};

const LoginPage = () => {
  return (
    <VStack as={"main"} px={{ md: 12, base: 4 }}>
      <LoginForm />
    </VStack>
  );
};

export default LoginPage;
