import { z } from "zod";
import { warehouses } from "../database/schemas/schema";

const inventoriesSchema = z.object({
  id: z.number().optional(),
  sku: z
    .string({ message: "SKU should be in string" })
    .length(8, "SKU should be 8 character long"),
  warehouseId: z.number({ message: "warehouse id should be a number" }),
  productId: z.number({ message: "product id should be a number" }),
});

export type InvetoriesTS = z.infer<typeof inventoriesSchema>;
export default inventoriesSchema;
