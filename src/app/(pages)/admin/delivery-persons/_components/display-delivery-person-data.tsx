"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import columns from "./columns";
import { getAllDeliveryPerson } from "@/app/data request api/delivery-person";
import { DeliveryPersonTS } from "@/lib/validators/deliveryPersonsSchema";
import { DataTable } from "../../_components/data-table";
import { DeliveryPersonReqTS } from "@/types";

type Props = {};

const DisplayDeliveryPersonData = (props: Props) => {
  const {
    data: deliveryPerosn,
    isLoading,
    isError,
    error,
  } = useQuery<DeliveryPersonReqTS>({
    queryKey: ["delivery-person"],
    queryFn: () => getAllDeliveryPerson(),
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
  return <DataTable columns={columns} data={deliveryPerosn?.data || []} />;
};

export default DisplayDeliveryPersonData;
