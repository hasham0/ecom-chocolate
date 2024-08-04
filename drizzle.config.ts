import { env } from "@/lib/env/env";
import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  schema: "./src/lib/database/schemas",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});

export default config;
