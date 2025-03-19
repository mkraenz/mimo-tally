import { Provider } from "@/components/ui/provider";
import { content } from "@/content";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: content.htmlMeta.title,
  description: content.htmlMeta.description,
  keywords: content.htmlMeta.keywords,
  metadataBase: new URL(content.htmlMeta.baseUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang={"en"}>
        <body>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
