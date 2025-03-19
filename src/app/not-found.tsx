import { Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { content } from "../content";

const NotFound: FC = () => {
  return (
    <VStack as={"main"} justify={"center"} h={"100svh"} px={8}>
      <Heading as={"h1"} size={"5xl"}>
        {content.notFound.title}
      </Heading>
      <Button
        asChild
        variant={"solid"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        width={{ base: "100%", md: "200px" }}
        mt={16}
      >
        <Link href={content.nav.home.href}>
          {content.notFound.backToHomeButton}
        </Link>
      </Button>
    </VStack>
  );
};

export default NotFound;
