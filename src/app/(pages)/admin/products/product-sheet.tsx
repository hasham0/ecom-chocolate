"use client";
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
import { useNewProduct } from "@/store/hooks/product-hook";

type Props = {};

const ProductSheet = ({}: Props) => {
  const { isOpen, onClose } = useNewProduct((state) => state);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: (data: FormData) => createPrduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
      toast({
        title: "Product Created Successfully",
        description: "new product created",
      });
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Create Product</SheetTitle>
          <SheetDescription>create a new product </SheetDescription>
        </SheetHeader>
        <CreateProductForm onSubmit={onSubmitFormValues} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default ProductSheet;
