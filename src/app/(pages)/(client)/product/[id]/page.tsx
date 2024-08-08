"use client";
import { getProductByID } from "@/app/data request api/product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import orderSchema, { OrderTS } from "@/lib/validators/orderSchema";
import { SingleProductReqTS } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

export default function SignlePage({}: Props) {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useQuery<SingleProductReqTS>({
    queryKey: ["product", id],
    queryFn: () => getProductByID(id),
    staleTime: 10 * 1000,
  });

  const form = useForm<OrderTS>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      address: "",
      pincode: "",
      qty: 1,
      productId: Number(id),
    },
  });

  if (isError) {
    const err = error.message;
    return (
      <div className="flex h-64 w-full items-center justify-center text-xl text-red-600 underline underline-offset-1">
        {err || "Error loading products "}
      </div>
    );
  }
  const handleOrderForm = (value: OrderTS) => {};

  return (
    <section className="custom-height relative bg-[#f5f5f5]">
      <div className="z-50 mx-auto flex h-full max-w-6xl gap-x-10 px-5 py-14 md:py-20">
        <div>
          {isLoading ? (
            <Skeleton className="bg-brown-100 aspect-square w-[28rem]" />
          ) : (
            <Image
              src={`/assets/${product?.data?.image}` ?? "/product1.jpg"}
              alt={product?.data?.name ?? "image"}
              width={0}
              height={0}
              sizes="100vw"
              className="aspect-square w-[28rem] rounded-md object-cover shadow-2xl"
            />
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-1 flex-col gap-y-2">
            <Skeleton className="bg-brown-100 h-4 w-16" />
            <Skeleton className="bg-brown-100 h-10 w-2/3" />
            <div className="flex items-center gap-x-3">
              <div className="flex items-center gap-x-0.5">
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" />
              </div>
              <span className="text-sm">144 Reviews</span>
            </div>
            <Skeleton className="bg-brown-100 mt-2 h-28 w-full" />
            <Separator className="bg-brown-900 my-6" />
            <div className="flex items-center justify-between">
              <Skeleton className="bg-brown-100 h-10 w-28" />
              <Skeleton className="bg-brown-100 h-10 w-60" />
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-y-2">
            <h2 className="text-brown-500 text-sm tracking-widest">
              BRAND NAME
            </h2>
            <h2 className="text-brown-900 text-4xl font-semibold">
              {product?.data?.name}
            </h2>

            <div className="flex items-center gap-x-3">
              <div className="flex items-center gap-x-0.5">
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" />
              </div>
              <span className="text-sm">144 Reviews</span>
            </div>

            <p className="mt-1">{product?.data?.description}</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleOrderForm)}>
                <div className="mt-2 flex gap-x-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-3/6">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              className="border-brown-200 focus-visible:ring-brown-400 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0"
                              placeholder="e.g. Open street, 55"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-3/6">
                          <FormLabel>Pincode</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="border-brown-200 focus-visible:ring-brown-400 h-9 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0"
                              placeholder="e.g. 567987"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="qty"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-3/6">
                          <FormLabel>Qty</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="border-brown-200 focus-visible:ring-brown-400 h-9 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0"
                              placeholder="e.g. 1"
                              {...field}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <Separator className="bg-brown-900 my-6" />
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-semibold">
                    ${product?.data?.price}
                  </span>
                  {/* {session ? (
                    <Button type="submit" disabled={isPending}>
                      {isPending && (
                        <>
                          <Loader2 className="mr-2 size-5 animate-spin" />
                        </>
                      )}

                      <span>Buy Now</span>
                    </Button>
                  ) : (
                    <Link href={`/api/auth/signin?callbackUrl=${pathname}`}>
                      <Button>Buy Now</Button>
                    </Link>
                  )} */}
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </section>
  );
}
