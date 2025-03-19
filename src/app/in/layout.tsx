import "@/app/globals.css";
import { content } from "@/content";
import { Grid } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: content.htmlMeta.title,
  description: content.htmlMeta.description,
  keywords: content.htmlMeta.keywords,
  metadataBase: new URL(content.htmlMeta.baseUrl),
};

export default function InAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Grid templateRows={"1fr"} py={4} minH={"100svh"}>
      {children}
    </Grid>
  );
}
