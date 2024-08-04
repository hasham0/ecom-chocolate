import { z } from "zod";

const warehousesSchema = z.object({
  name: z.string({ message: "warehouse name should be string" }),
  pincode: z.string({ message: "pincode should be string" }).min(6),
});

export default warehousesSchema;
