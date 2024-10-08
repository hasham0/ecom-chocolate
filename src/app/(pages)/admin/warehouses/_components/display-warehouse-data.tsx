"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getAllWarehouses } from "@/app/data request api/warehouse";
import { DataTable } from "../../_components/data-table";
import columns from "./columns";
import { WarehouseReqTS } from "@/types";

type Props = {};

const DisplayWarehouseData = (props: Props) => {
  const {
    data: warehouse,
    isLoading,
    isError,
    error,
  } = useQuery<WarehouseReqTS>({
    queryKey: ["warehouse"],
    queryFn: () => getAllWarehouses(),
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
  return <DataTable columns={columns} data={warehouse?.data || []} />;
};

export default DisplayWarehouseData;
