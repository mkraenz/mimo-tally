import { z } from "zod";

const EnvVarSchema = z.object({
  MIMO_AUTHORIZED_PARTY: z.string().url(),
});

const mimoEnv = EnvVarSchema.parse({
  // explicitly writing each property instead of just passing process.env because nextjs does static string substitution for env vars
  MIMO_AUTHORIZED_PARTY: process.env.MIMO_AUTHORIZED_PARTY,
});

export default mimoEnv;
