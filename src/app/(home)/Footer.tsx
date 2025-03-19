import { content } from "@/content";
import { HStack, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const DimmedText: FC<PropsWithChildren> = ({ children }) => (
  <Text color={"var(--chakra-colors-fg-muted)"}>{children}</Text>
);

const Footer: FC = () => {
  return (
    <HStack
      as={"footer"}
      justifyContent={"center"}
      separator={<DimmedText>•</DimmedText>}
      px={2}
    >
      {/* <Link href={content.footer.imprint.href}>
        <DimmedText>{content.footer.imprint.label}</DimmedText>
      </Link>
      <Link href={content.footer.privacy.href}>
        <DimmedText>{content.footer.privacy.label}</DimmedText>
      </Link> */}
      <DimmedText>{content.footer.copyright}</DimmedText>
    </HStack>
  );
};

export default Footer;
