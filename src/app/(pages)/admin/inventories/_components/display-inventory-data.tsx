"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { DataTable } from "../../_components/data-table";
import { InvetoriesTS } from "@/lib/validators/inventoriesSchema";
import { getAllInventries } from "@/app/data request api/inventories";
import columns from "./columns";

type Props = {};

const DisplayInventoryData = (props: Props) => {
  const {
    data: inventory,
    isLoading,
    isError,
    error,
  } = useQuery<{ message: string; data: InvetoriesTS[] }>({
    queryKey: ["inventories"],
    queryFn: getAllInventries,
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
  return <DataTable columns={columns} data={inventory?.data || []} />;
};

export default DisplayInventoryData;
