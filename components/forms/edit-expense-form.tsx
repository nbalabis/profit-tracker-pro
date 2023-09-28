"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Expense } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { useEditExpenseModal } from "@/hooks/use-edit-expense-modal";


interface EditExpenseFormProps {
  expense: Expense | null;
}

// Create zod schema for form validation
const formSchema = z.object({
  title: z.string().nonempty({ message: "Expense title is required" }),
  date: z.date({ required_error: "Date is required" }),
  price: z.coerce.number().nonnegative({ message: "Price cannot be negative" }),
});

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({ expense }) => {
  const router = useRouter();
  const { toast } = useToast();
  const modal = useEditExpenseModal();

  const [isLoading, setIsLoading] = useState(false);

  // Define a form using react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: expense?.title,
      date: expense?.date,
      price: expense?.price || 0,
    },
  });

  /* SUBMIT HANDLER */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // Send a PUT request to the API
      await axios.put("/api/expense", {
        storeId: expense?.storeId,
        expenseId: expense?.id,
        title: values.title,
        price: values.price,
        date: values.date,
      });
      // Reset the form and close the modal
      form.reset();
      modal.onClose();
      router.refresh();
      toast({
        title: "Success!",
        description: "Your expense has been updated.",
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
            {/* Expense Information */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="What was your expense?"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="price"
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
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Source Date</FormLabel>
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

export default EditExpenseForm;
