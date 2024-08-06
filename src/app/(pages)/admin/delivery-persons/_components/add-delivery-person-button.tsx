"use client";
import { Button } from "@/components/ui/button";
import { useDeliveryPerson } from "@/store/hooks/delivery-person-hook";

type Props = {};

const AddDeliveryPersonButton = (props: Props) => {
  const { onOpen } = useDeliveryPerson((state) => state);

  return (
    <div className="flex items-center justify-between">
      <h3 className="tracxking-tight p-2 text-2xl font-bold">
        Delivery Person
      </h3>
      <Button onClick={onOpen} size={"sm"}>
        Add Delivery Person
      </Button>
    </div>
  );
};

export default AddDeliveryPersonButton;
