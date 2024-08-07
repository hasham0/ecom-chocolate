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
import { InvetriesTS } from "@/lib/validators/inventriesSchema";
import { newInventry } from "@/app/data request api/inventries";
import CreateInventoryForm from "./create-inventory-form";

type Props = {};

const InventorySheet = ({}: Props) => {
  const { isOpen, onClose } = useNewInventory((state) => state);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-inventory"],
    mutationFn: (data: InvetriesTS) => newInventry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-person"] });
      onClose();
      toast({
        title: "Delivery Person Successfully Added",
        description: "new delivery person added",
      });
    },
  });

  const onSubmitFormValues = (values: InvetriesTS) => {
    mutate(values);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Add Delivery Person</SheetTitle>
          <SheetDescription>add a new delivery person</SheetDescription>
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
