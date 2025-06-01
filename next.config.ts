import type { NextConfig } from "next";
import mimoEnv from "./src/app/lib/environment";
import mimoClientEnv from "./src/app/lib/environmentClient";

// enforce env var validation at build time
mimoEnv;
mimoClientEnv;

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
