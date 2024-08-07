import { z } from "zod";

const deliveryPersonsSchema = z.object({
  id: z.string().optional(),
  name: z.string({ message: "delivery person name should be string" }),
  phone: z
    .string({ message: "phone should be string" })
    .length(11, { message: "phone number should be 11 character long" })
    .min(11)
    .max(11),
  warehousesId: z.number({
    message: "warehouse id should be in number",
  }),
});

export type DeliveryPersonTS = z.infer<typeof deliveryPersonsSchema>;
export default deliveryPersonsSchema;
