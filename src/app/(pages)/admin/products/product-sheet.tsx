"use client";
// import FormData from "form-data";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CreateProductForm from "./create-product-form";
import { FormValues } from "@/lib/validators/productSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPrduct } from "@/app/http/api";
import { useToast } from "@/components/ui/use-toast";

type Props = {};

const ProductSheet = ({}: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: (data: FormData) => createPrduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const onSubmitFormValues = (values: FormValues) => {
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("description", values.description);
    formdata.append("price", String(values.price));
    formdata.append("image", (values.image as FileList)[0]);
    return mutate(formdata);
  };

  return (
    <Sheet open={true}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Create Product</SheetTitle>
          <SheetDescription>create a new product </SheetDescription>
        </SheetHeader>
        <CreateProductForm onSubmit={onSubmitFormValues} />
      </SheetContent>
    </Sheet>
  );
};

export default ProductSheet;
