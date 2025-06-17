import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({ path: require.resolve("../.env") });

const envSchema = z.object({
  JWT_SECRET: z.string().min(10),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid env variables in api",
    parsed.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const env = parsed.data;
