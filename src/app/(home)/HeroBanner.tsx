import { content } from "@/content";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import GoToSignIn from "./GoToSignIn";

const HeroBanner = () => {
  return (
    <VStack gap={16} minH={"80svh"} justify={"center"} as={"article"}>
      <VStack>
        <Heading as={"h1"} size={"7xl"} textAlign={"center"} data-animated>
          {content.heading}
        </Heading>
      </VStack>
      <HStack
        gap={8}
        flexWrap={"wrap"}
        data-animated
        justify={"center"}
        minW={"100%"}
      >
        <GoToSignIn />
      </HStack>
    </VStack>
  );
};

export default HeroBanner;
