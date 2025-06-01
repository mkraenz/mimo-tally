"use client";

import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import {
  Box,
  Button,
  Fieldset,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { LuLogOut } from "react-icons/lu";

const TallyPage = () => {
  const [otherUserId, setOtherUserId] = useState("");
  return (
    <VStack as={"main"} px={{ md: 12, base: 4 }} gap={8}>
      <VStack />
      <Fieldset.Root size={"lg"} maxW={"md"} w={"xs"} height={"75svh"}>
        <Fieldset.HelperText>
          Enter your friend&apos;s details to start collaborating.
        </Fieldset.HelperText>

        <Fieldset.Content>
          <Field label={"Account number"}>
            <InputGroup flex={"1"} w={"100%"}>
              <Input
                name={"otherUserId"}
                placeholder={"000000-0000-0000-0000-000000000000"}
                required
                value={otherUserId}
                onChange={(e) => setOtherUserId(e.currentTarget.value)}
              />
            </InputGroup>
          </Field>
        </Fieldset.Content>
      </Fieldset.Root>
      <Button w={"xs"} asChild>
        <Link href={`/in/${otherUserId}`}>Start</Link>
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
