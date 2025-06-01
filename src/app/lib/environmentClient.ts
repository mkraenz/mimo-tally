import { z } from "zod";

const EnvVarSchema = z.object({
  NEXT_PUBLIC_MIMO_API_BASE_URL: z.string().url(),
});

const mimoClientEnv = EnvVarSchema.parse({
  // explicitly writing each property instead of just passing process.env because nextjs does static string substitution for env vars
  NEXT_PUBLIC_MIMO_API_BASE_URL: process.env.NEXT_PUBLIC_MIMO_API_BASE_URL,
});

export default mimoClientEnv;
