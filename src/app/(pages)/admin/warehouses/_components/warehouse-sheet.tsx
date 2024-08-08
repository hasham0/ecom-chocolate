"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWarehouse } from "@/store/hooks/warehouse-hook";
import { WarehouseTS } from "@/lib/validators/warehouseSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { createWarehouse } from "@/app/data request api/warehouse";
import CreateWarehouseForm from "./create-warehouse-form";

type Props = {};

const WarehouseSheet = ({}: Props) => {
  const { isOpen, onClose } = useWarehouse((state) => state);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-warehouse"],
    mutationFn: (data: WarehouseTS) => createWarehouse(data),
    onSuccess: (success) => {
      const { status, message } = success;
      queryClient.invalidateQueries({ queryKey: ["warehouse"] });
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

  const onSubmitFormValues = (values: WarehouseTS) => {
    mutate(values);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Add Warehouse</SheetTitle>
          <SheetDescription>add a new warehouse </SheetDescription>
        </SheetHeader>
        <CreateWarehouseForm
          onSubmit={onSubmitFormValues}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};

export default WarehouseSheet;
