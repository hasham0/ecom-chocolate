import { z } from "zod";

const warehousesSchema = z.object({
  id: z.string().optional(),
  name: z.string({ message: "warehouse name should be string" }),
  pincode: z.string({ message: "pincode should be string" }).min(6),
});

export type WarehouseTS = z.infer<typeof warehousesSchema>;
export default warehousesSchema;
