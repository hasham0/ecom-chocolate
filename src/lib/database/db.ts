import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connection = postgres(process.env.DATABASE_URL as string);

const db = drizzle(connection);

export { connection, db };
