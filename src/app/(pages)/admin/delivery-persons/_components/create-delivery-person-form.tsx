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
import deliveryPersonSchema, {
  DeliveryPersonTS,
} from "@/lib/validators/deliveryPersonsSchema";
import { useQuery } from "@tanstack/react-query";
import { WarehouseTS } from "@/lib/validators/warehouseSchema";
import { getAllWarehouses } from "@/app/data request api/warehouse";

type Props = {
  onSubmit: (values: DeliveryPersonTS) => void;
  disabled: boolean;
};

const CreateDeliveryPersonForm = ({ onSubmit, disabled }: Props) => {
  const form = useForm<z.infer<typeof deliveryPersonSchema>>({
    resolver: zodResolver(deliveryPersonSchema),
    defaultValues: {
      name: "",
      phone: "",
      warehousesId: 0,
    },
  });

  const {
    data: warehouses,
    isLoading,
    isError,
  } = useQuery<{ message: string; data: WarehouseTS[] }>({
    queryKey: ["warehouses"],
    queryFn: () => getAllWarehouses(),
  });
  const onSubmitHandler = (values: DeliveryPersonTS) => {
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="pincode" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="warehousesId"
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
                  {isLoading ? (
                    <SelectItem value="Loading">Loading...</SelectItem>
                  ) : (
                    <>
                      {warehouses &&
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
        <Button className="w-full" type="submit" disabled={disabled}>
          {disabled ? <Loader2 className="size-4 animate-spin" /> : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateDeliveryPersonForm;
