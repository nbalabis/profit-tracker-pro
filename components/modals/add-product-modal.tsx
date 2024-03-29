"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useProModal } from "@/hooks/use-pro-modal";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { categories, sources } from "@/config/selectOptions";
import { useAddProductModal } from "@/hooks/use-add-product-modal";

// Create zod schema for form validation
const formSchema = z.object({
  name: z.string().nonempty({ message: "Product name is required" }),
  source: z.string().nonempty({ message: "Product source is required" }),
  sourceDate: z.date({ required_error: "Product source date is required" }),
  sourcePrice: z.coerce
    .number()
    .nonnegative({ message: "Price cannot be negative" }),
  category: z.string().nonempty({ message: "Product category is required" }),
  notes: z.string().optional(),
});

const AddProductModal = () => {
  const { toast } = useToast();
  const router = useRouter();
  const modal = useAddProductModal();
  const { storeId } = useParams();
  const proModal = useProModal();

  const [isLoading, setIsLoading] = useState(false);

  // Define a form using react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      source: "",
      sourceDate: new Date(),
      sourcePrice: 0,
      category: "",
      notes: "",
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      values.sourceDate.setHours(0, 0, 0, 0);

      const response = await axios.post("/api/product", {
        name: values.name,
        storeId,
        source: values.source,
        sourceDate: values.sourceDate,
        sourcePrice: values.sourcePrice,
        category: values.category,
        notes: values.notes,
      });

      form.reset();
      modal.onClose();
      router.refresh();
      toast({
        title: "Success!",
        description: "Your product has been added.",
      });
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error?.response?.data || "Please try again later.",
        });
      }
    } finally {
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
          <DialogTitle>Add a New Product</DialogTitle>
        </DialogHeader>
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
                            placeholder="What did you purchase?"
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
                              disabled={isLoading}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a source" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
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
                        name="sourceDate"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>Source Date</FormLabel>
                            <Popover modal={true}>
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
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
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

                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="sourcePrice"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="0.01"
                                placeholder="What did you pay?"
                                disabled={isLoading}
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
                Add
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
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
