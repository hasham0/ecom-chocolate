import { z } from "zod";

const orderSchema = z.object({
  id: z.number().optional(),
  productId: z.number({ message: "Product is should be a number" }),
  pincode: z
    .string({ message: "Pincode should be a string" })
    .length(6, "Pincode should be 6 chars long"),
  qty: z.number({ message: "Qty should be a number" }),
  address: z
    .string({ message: "Address should be a string" })
    .min(5, { message: "Address should be at least 5 chars long" }),
});

export type OrderTS = z.infer<typeof orderSchema>;
export default orderSchema;
