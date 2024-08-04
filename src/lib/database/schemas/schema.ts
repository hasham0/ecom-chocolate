import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { InferSelectModel, InferInsertModel } from "drizzle-orm";

enum dbTables {
  USERS = "users",
  PRODUCTS = "products",
}

// user schema
export const users = pgTable(dbTables.USERS, {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  provider: varchar("provider", { length: 30 }),
  externalID: varchar("external_id", { length: 100 }).notNull(),
  image: text("image"),
  role: varchar("role", { length: 20 }).notNull().default("customer"),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});
// type SelectUser = typeof users.$inferSelect;
// type InsertUser = typeof users.$inferInsert;

type userSelectTS = InferSelectModel<typeof users>;
type userInserTS = InferInsertModel<typeof users>;

export type { userSelectTS, userInserTS };

// product schema
export const products = pgTable(dbTables.PRODUCTS, {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  image: text("image"),
  description: text("description"),
  price: integer("price").notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

type productsSelectTS = InferSelectModel<typeof products>;
//type productsInsertTS = InferInsertModel<typeof products>;
type productsInsertTS = typeof products.$inferInsert;

export type { productsSelectTS, productsInsertTS };
