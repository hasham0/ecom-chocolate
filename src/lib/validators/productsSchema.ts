import { z } from "zod";

export const isServer = typeof window === "undefined";

const productsSchema = z.object({
  id: z.string().optional(),
  name: z.string({ message: "Product name should be a string" }).min(3),
  image: z.instanceof(isServer ? File : FileList, {
    message: "Product image should be a image",
  }),
  description: z
    .string({ message: "Product description should be a string" })
    .min(8),
  price: z.number({ message: "Product price should be a number" }),
});

export type FormValues = z.input<typeof productsSchema>;
export type ProductTS = z.infer<typeof productsSchema>;
export default productsSchema;
