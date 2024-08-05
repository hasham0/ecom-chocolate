import { sql } from "drizzle-orm";
import {
  index,
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
  WAREHOUSES = "warehouses",
  DELIVIERY_PERSONS = "delivery_persons",
  ORDERS = "orders",
  INVENTRIES = "inventries",
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
type productsInsertTS = InferInsertModel<typeof products>;

export type { productsSelectTS, productsInsertTS };

// warehouse schema
export const warehouses = pgTable(
  dbTables.WAREHOUSES,
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    pincode: varchar("pincode", { length: 8 }).notNull(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      pincodeIdx: index("pincodeIdx").on(table.pincode),
    };
  }
);

type warehousesSelectTS = InferSelectModel<typeof warehouses>;
type warehousesInsertTS = InferInsertModel<typeof warehouses>;

export type { warehousesSelectTS, warehousesInsertTS };

// orders schema
export const orders = pgTable(dbTables.ORDERS, {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

type ordersSelectTS = InferSelectModel<typeof orders>;
type ordersInsertTS = InferInsertModel<typeof orders>;

export type { ordersSelectTS, ordersInsertTS };

// delivery schema
export const deliveryPersons = pgTable(dbTables.DELIVIERY_PERSONS, {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 11 }).notNull(),
  warehousesId: integer("warehouse_id").references(() => warehouses.id, {
    onDelete: "cascade",
  }),
  orderId: integer("order_id").references(() => orders.id, {
    onDelete: "set null",
  }),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

type deliveryPersonsSelectTS = InferSelectModel<typeof deliveryPersons>;
type deliveryPersonsInsertTS = InferInsertModel<typeof deliveryPersons>;

export type { deliveryPersonsSelectTS, deliveryPersonsInsertTS };

// inventries schema
export const inventries = pgTable(dbTables.INVENTRIES, {
  id: serial("id").primaryKey(),
  sku: varchar("sku", { length: 8 }).unique().notNull(),
  orderId: integer("order_id").references(() => orders.id, {
    onDelete: "set null",
  }),
  warehouseId: integer("warehouse_id").references(() => warehouses.id, {
    onDelete: "cascade",
  }),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "cascade",
  }),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

type inventriesSelectTS = InferSelectModel<typeof inventries>;
type inventriesInsertTS = InferInsertModel<typeof inventries>;

export type { inventriesSelectTS, inventriesInsertTS };
