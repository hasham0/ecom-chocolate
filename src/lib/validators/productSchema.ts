import { z } from "zod";

const productSchema = z.object({
  name: z.string({ message: "product name should be string" }),
  image: z.instanceof(File, { message: "product image should be a string" }),
  description: z.string({ message: "product description should be string" }),
  price: z.number({ message: "product price should be number" }),
});

export default productSchema;
