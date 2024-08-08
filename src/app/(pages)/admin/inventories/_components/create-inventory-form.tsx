"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllWarehouses } from "@/app/data request api/warehouse";
import inventoriesSchema, {
  InvetoriesTS,
} from "@/lib/validators/inventoriesSchema";
import { WarehouseTS } from "@/lib/validators/warehouseSchema";
import { ProductTS } from "@/lib/validators/productsSchema";
import { getAllProducts } from "@/app/data request api/product";
import { ProductReqTS, WarehouseReqTS } from "@/types";

type Props = {
  onSubmit: (values: InvetoriesTS) => void;
  disabled: boolean;
};

const CreateInventoryForm = ({ onSubmit, disabled }: Props) => {
  const form = useForm<z.infer<typeof inventoriesSchema>>({
    resolver: zodResolver(inventoriesSchema),
    defaultValues: {
      sku: "",
    },
  });

  const { data: warehouses, isLoading: isWarehouseLoading } =
    useQuery<WarehouseReqTS>({
      queryKey: ["warehouses"],
      queryFn: () => getAllWarehouses(),
    });

  const { data: products, isLoading: isProductsLoading } =
    useQuery<ProductReqTS>({
      queryKey: ["products"],
      queryFn: () => getAllProducts(),
    });

  const onSubmitHandler = (values: InvetoriesTS) => {
    onSubmit(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8">
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="CH123456" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="warehouseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse ID</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Warehouse ID" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isWarehouseLoading ? (
                    <SelectItem value="Loading">Loading...</SelectItem>
                  ) : (
                    <>
                      {warehouses &&
                        warehouses.data?.length &&
                        warehouses.data.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id ? item.id?.toString() : ""}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product ID</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product ID" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isProductsLoading ? (
                    <SelectItem value="Loading">Loading...</SelectItem>
                  ) : (
                    <>
                      {products &&
                        products.data?.length &&
                        products.data.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id ? item.id?.toString() : ""}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={disabled}>
          {disabled ? <Loader2 className="size-4 animate-spin" /> : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateInventoryForm;
