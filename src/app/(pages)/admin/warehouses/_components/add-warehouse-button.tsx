"use client";
import { Button } from "@/components/ui/button";
import { useWarehouse } from "@/store/hooks/warehouse-hook";
import React from "react";

type Props = {};

const AddWarehouseButton = (props: Props) => {
  const { onOpen } = useWarehouse((state) => state);

  return (
    <div className="flex items-center justify-between">
      <h3 className="tracxking-tight p-2 text-2xl font-bold">Warehouses</h3>
      <Button onClick={onOpen} size={"sm"}>
        Add Warehouse
      </Button>
    </div>
  );
};

export default AddWarehouseButton;
