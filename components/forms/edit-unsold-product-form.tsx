"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";
import { Product } from "@prisma/client";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { DialogFooter } from "@/components/ui/dialog";
import { cn, convertLocalDateToUTC } from "@/lib/utils";
import { categories, sources } from "@/config/selectOptions";
import { useEditProductModal } from "@/hooks/use-edit-product-modal";

interface EditUnsoldProductFormProps {
  product: Product | null;
}

/* FORM SCHEMA */
const unsoldFormSchema = z.object({
  name: z.string().nonempty({ message: "Product name is required" }),
  source: z.string().nonempty({ message: "Product source is required" }),
  source_date: z.date({ required_error: "Product source date is required" }),
  source_price: z.coerce
    .number()
    .nonnegative({ message: "Price cannot be negative" }),
  category: z.string().nonempty({ message: "Product category is required" }),
  notes: z.string().optional(),
});

const EditUnsoldProductForm: React.FC<EditUnsoldProductFormProps> = ({
  product,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const modal = useEditProductModal();

  const [isLoading, setIsLoading] = useState(false);

  /* FORM DEFINITION */
  const form = useForm<z.infer<typeof unsoldFormSchema>>({
    resolver: zodResolver(unsoldFormSchema),
    defaultValues: {
      name: product?.name,
      source: product?.source,
      source_date: product?.sourceDate,
      source_price: product?.sourcePrice || 0,
      category: product?.category,
      notes: product?.notes || "",
    },
  });

  if (!product) return null;

  /* SUBMIT HANDLER */
  async function onSubmit(values: z.infer<typeof unsoldFormSchema>) {
    try {
      setIsLoading(true);

      // Send a PUT request to the API
      await axios.put("/api/product", {
        storeId: product?.storeId,
        productId: product?.id,
        name: values.name,
        source: values.source,
        sourceDate: values.source_date,
        sourcePrice: values.source_price,
        category: values.category,
        notes: values.notes,
      });

      // Reset the form and close the modal
      form.reset();
      modal.onClose();
      router.refresh();
      toast({
        title: "Success!",
        description: "Your product has been updated.",
      });
    } catch (error: any) {
      // Alert any errors (unlimited 'edit' for all users - no pro modal)
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <div className="space-y-4 py-2 pb-4">
            {/* Item Information */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={product.name}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* SOURCE INPUTS */}
            <div className="space-y-2">
              <div className="flex flex-col space-y-2">
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Source</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={product.source}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a source" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* TODO: REPLACE WITH SOURCES SPECIFIC TO CURRENT STORE */}
                            {sources?.map((source) => (
                              <SelectItem
                                value={source.value}
                                key={source.value}
                              >
                                {source.title}
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
                    name="source_date"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Source Date</FormLabel>
                        <Popover modal={true}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isLoading}
                                variant={"outline"}
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="source_price"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Purchase Price</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            disabled={isLoading}
                            step="0.01"
                            placeholder="How much did you pay for it?"
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={product.category}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem
                                value={category.value}
                                key={category.value}
                              >
                                <div className="flex">
                                  <category.icon className="mr-2 h-4 w-4" />
                                  {category.title}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Storage location, special instructions, etc."
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
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
  );
};

export default EditUnsoldProductForm;
