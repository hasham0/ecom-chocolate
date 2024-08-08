"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useNewInventory } from "@/store/hooks/inventory-hook";
import { newInventry } from "@/app/data request api/inventories";
import CreateInventoryForm from "./create-inventory-form";
import { InvetoriesTS } from "@/lib/validators/inventoriesSchema";
import { Button } from "@/components/ui/button";

type Props = {};

const InventorySheet = ({}: Props) => {
  const { isOpen, onClose } = useNewInventory((state) => state);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-inventory"],
    mutationFn: (data: InvetoriesTS) => newInventry(data),

    onSuccess: (success) => {
      const { message, status } = success;
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      onClose();
      if (!status) {
        return toast({
          duration: 3000,
          variant: "destructive",
          title: message,
        });
      }
      return toast({
        duration: 3000,
        variant: "success",
        title: message,
      });
    },
  });

  const onSubmitFormValues = (values: InvetoriesTS) => {
    mutate(values);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Add Inventory</SheetTitle>
          <SheetDescription>add new inventory item</SheetDescription>
        </SheetHeader>
        <CreateInventoryForm
          onSubmit={onSubmitFormValues}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};

export default InventorySheet;
