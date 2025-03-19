import { content } from "@/content";
import { Grid, VStack } from "@chakra-ui/react";
import { Metadata } from "next";
import Footer from "./(home)/Footer";
import HeroBanner from "./(home)/HeroBanner";
import Navbar from "./(home)/Navbar";

export const metadata: Metadata = {
  alternates: {
    canonical: content.meta.homeCanonicalTag,
  },
};

const HomePage = () => {
  return (
    <Grid
      templateRows={"var(--navbar-height) 1fr min-content"}
      pb={4}
      minH={"100svh"}
    >
      <Navbar />
      <VStack as={"main"} px={{ md: 12, base: 4 }}>
        <HeroBanner />
      </VStack>
      <Footer />
    </Grid>
  );
};

export default HomePage;
