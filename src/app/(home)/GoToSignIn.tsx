import { Button } from "@chakra-ui/react";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { FC } from "react";
import { content } from "../../content";

type Props = {};

const GoToSignIn: FC<Props> = async (props) => {
  const { userId } = await auth();
  return userId ? (
    <Button asChild fontWeight={"bold"} minW={{ md: "md", base: "full" }}>
      <Link href={content.signIn.openApp.href}>
        {content.signIn.openApp.label}
      </Link>
    </Button>
  ) : (
    <Button asChild fontWeight={"bold"} minW={{ md: "md", base: "full" }}>
      <Link href={content.signIn.href}>{content.signIn.label}</Link>
    </Button>
  );
};

export default GoToSignIn;
