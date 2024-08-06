"use client";
import { Button } from "@/components/ui/button";
import { useNewProduct } from "@/store/hooks/product-hook";
import React from "react";

type Props = {};

const AddProductButton = (props: Props) => {
  const { onOpen } = useNewProduct((state) => state);

  return (
    <div className="flex items-center justify-between">
      <h3 className="p-2 text-2xl font-bold tracking-tight">Products</h3>
      <Button onClick={onOpen} size={"sm"}>
        Add Product
      </Button>
    </div>
  );
};

export default AddProductButton;
