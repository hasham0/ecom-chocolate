"use client";
import { Button } from "@/components/ui/button";
import { useNewInventory } from "@/store/hooks/inventory-hook";
import React from "react";

type Props = {};

const AddInventoryButton = (props: Props) => {
  const { onOpen } = useNewInventory((state) => state);

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

export default AddInventoryButton;
