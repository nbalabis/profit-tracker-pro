"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { channels } from "@/config/selectOptions";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { useSoldProductModal } from "@/hooks/use-sold-product-modal";

/* ZOD FORM SCHEMA */
const formSchema = z.object({
  sale_price: z.coerce
    .number()
    .nonnegative({ message: "Price cannot be negative" }),
  sale_date: z.date({ required_error: "Sale date is required" }),
  sale_channel: z.string().nonempty({ message: "Sales channel is required" }),
  platform_fees: z.coerce
    .number()
    .nonnegative({ message: "Fee cannot be negative" }),
  tax: z.coerce.number().nonnegative({ message: "Taxes cannot be negative" }),
  shipping_fees: z.coerce
    .number()
    .nonnegative({ message: "Fee cannot be negative" }),
  misc_fees: z.coerce
    .number()
    .nonnegative({ message: "Fee cannot be negative" }),
});

const SoldProductModal = () => {
  const router = useRouter();
  const { toast } = useToast();
  const modal = useSoldProductModal();

  const [isLoading, setIsLoading] = useState(false);

  /* FORM DEFINITION */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sale_price: 0,
      sale_date: new Date(),
      sale_channel: "",
      platform_fees: 0,
      tax: 0,
      shipping_fees: 0,
      misc_fees: 0,
    },
  });

  /* SUBMIT HANDLER */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      values.sale_date.setHours(0, 0, 0, 0);

      // Send a PATCH request to the API
      await axios.patch("/api/product", {
        storeId: modal.storeId,
        productId: modal.productId,
        salePrice: values.sale_price,
        saleDate: values.sale_date,
        saleChannel: values.sale_channel,
        platformFee: values.platform_fees,
        tax: values.tax,
        shippingFee: values.shipping_fees,
        miscFee: values.misc_fees,
      });

      // Reset the form and close the modal
      form.reset();
      modal.onClose();
      router.refresh();
      toast({
        title: "Success!",
        description: "Your product has been marked as sold.",
      });
    } catch (error: any) {
      // Alert any errors (unlimited 'mark as sold' for all users - no pro modal)
      toast({
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data || "Please try again later.",
      });
    } finally {
      // Reset loading state - leave inputs as-is if there's an error
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={modal.isOpen}
      onOpenChange={() => {
        modal.onClose();
        form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Congrats on your sale!</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5 py-2 pb-4">
              <div className="flex w-full justify-between gap-3">
                <FormField
                  control={form.control}
                  name="sale_price"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Sale Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sale_date"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Sale Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              disabled={isLoading}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full items-center gap-3">
                <FormField
                  control={form.control}
                  name="sale_channel"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Sales Channel</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a channel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {channels?.map((channel) => (
                            <SelectItem
                              key={channel.value}
                              value={channel.value}
                            >
                              {channel.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="platform_fees"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Platform Fee</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full justify-between gap-3">
                <FormField
                  control={form.control}
                  name="tax"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Taxes</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipping_fees"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Shipping Fees</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="misc_fees"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Misc. Fees</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                onClick={() => {
                  modal.onClose();
                  form.reset();
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SoldProductModal;
