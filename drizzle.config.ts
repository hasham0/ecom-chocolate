import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  schema: "./src/lib/database/schemas/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  migrations: {
    prefix: "supabase",
  },
});

export default config;
