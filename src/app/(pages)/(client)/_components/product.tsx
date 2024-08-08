"use client";
import { getAllProducts } from "@/app/data request api/product";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductTS } from "@/lib/validators/productsSchema";

type Props = {};

const Products = ({}: Props) => {
  const skeletons = Array.from({ length: 4 });

  const {
    data: product,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
    staleTime: 10 * 1000,
  });

  if (isError) {
    const err = error.message;
    return (
      <div className="flex h-64 w-full items-center justify-center text-xl text-red-600 underline underline-offset-1">
        {err || "Error loading products "}
      </div>
    );
  }

  return (
    <section className="bg-[#f5f5f5] px-5 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-5">
          <Separator className="bg-brown-900 h-0.5 w-20" />
          <h2 className="text-brown-900 text-3xl font-bold tracking-tight">
            Products
          </h2>
          <Separator className="bg-brown-900 h-0.5 w-20" />
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading && (
            <>
              {skeletons.map((_, i) => (
                <div key={i} className="flex h-full w-full flex-col gap-5">
                  <Skeleton className="bg-brown-100 aspect-square w-full rounded-md" />
                  <Skeleton className="bg-brown-100 h-5 w-full rounded-md" />
                  <Skeleton className="bg-brown-100 h-5 w-10 rounded-md" />
                  <Skeleton className="bg-brown-100 h-8 w-full rounded-md" />
                </div>
              ))}
            </>
          )}

          {product?.data?.map((item: ProductTS, index: number) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center gap-5"
            >
              <Image
                src={`/assets/${item.image}`}
                alt=""
                height={100}
                width={100}
                sizes="100vw"
                className="aspect-square rounded-md object-cover shadow-lg hover:cursor-pointer"
                style={{ width: "100%" }}
              />
              <div className="text-brown-900 w-full text-lg font-semibold">
                <p>Name:{item.name}</p>
                <div className="mt-1 space-x-2">
                  <span className="font-bold">Price: ${item.price}</span>
                </div>
                <Link href={`/product/${item.id}`}>
                  <Button
                    size={"sm"}
                    className="bg-brown-900 hover:bg-brown-800 active:bg-brown-700 mt-5 w-full"
                  >
                    Buy now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
