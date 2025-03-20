import type { NextConfig } from "next";
import mimoEnv from "./src/app/lib/environment";

mimoEnv; // this enforces env var validation at build time

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
