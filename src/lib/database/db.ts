import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/lib/env/env";
import postgres from "postgres";

const connection = postgres(env.DATABASE_URL);

const db = drizzle(connection);

export { connection, db };
