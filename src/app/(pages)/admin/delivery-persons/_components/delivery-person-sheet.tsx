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
import { useDeliveryPerson } from "@/store/hooks/delivery-person-hook";
import CreateDeliveryPersonForm from "./create-delivery-person-form";
import { DeliveryPersonTS } from "@/lib/validators/deliveryPersonsSchema";
import { newDeliveryPerson } from "@/app/data request api/delivery-person";

type Props = {};

const DeliveryPersonSheet = ({}: Props) => {
  const { isOpen, onClose } = useDeliveryPerson((state) => state);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-delivery-person"],
    mutationFn: (data: DeliveryPersonTS) => newDeliveryPerson(data),
    onSuccess: (success) => {
      const { message, status } = success;
      queryClient.invalidateQueries({ queryKey: ["delivery-person"] });
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

  const onSubmitFormValues = (values: DeliveryPersonTS) => {
    mutate(values);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Add Delivery Person</SheetTitle>
          <SheetDescription>add a new delivery person</SheetDescription>
        </SheetHeader>
        <CreateDeliveryPersonForm
          onSubmit={onSubmitFormValues}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};

export default DeliveryPersonSheet;
