import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, connection } from "@/lib/database/db";

(async () => {
  await migrate(db, {
    migrationsFolder: "./drizzle",
  });
  await connection.end();
})();
