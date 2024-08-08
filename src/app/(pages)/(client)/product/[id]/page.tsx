"use client";
import { getProductByID } from "@/app/data request api/product";
import { ProductReqTS } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

export default function SignlePage({}: Props) {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<ProductReqTS>({
    queryKey: ["product", id],
    queryFn: () => getProductByID(id),
  });
  console.log(product);
  return <div>page</div>;
}
