"use client";
import React from "react";
import { DataTable } from "./data-table";
import columns from "./columns";
import { getAllProducts } from "@/app/http/api";
import { useQuery } from "@tanstack/react-query";
import { ProductTS } from "@/lib/validators/productSchema";
import { Loader2 } from "lucide-react";

type Props = {};

const DisplayData = (props: Props) => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery<ProductTS[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    const err = error.message;
    return (
      <div className="text-xl text-red-600 underline underline-offset-1">
        {err || "Error loading products "}
      </div>
    );
  }

  return <DataTable columns={columns} data={products || []} />;
};

export default DisplayData;
