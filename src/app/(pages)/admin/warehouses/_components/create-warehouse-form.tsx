"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import productSchema from "@/lib/validators/productSchema";
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
import warehousesSchema, {
  WarehouseTS,
} from "@/lib/validators/warehouseSchema";

type Props = { onSubmit: (values: WarehouseTS) => void; disabled: boolean };

const CreateWarehouseForm = ({ onSubmit, disabled }: Props) => {
  const form = useForm<z.infer<typeof warehousesSchema>>({
    resolver: zodResolver(warehousesSchema),
    defaultValues: {
      name: "",
      pincode: "",
    },
  });

  const onSubmitHandler = (values: WarehouseTS) => {
    onSubmit(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="pincode" type="text" {...field} />
              </FormControl>
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

export default CreateWarehouseForm;
