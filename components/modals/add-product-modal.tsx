import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAddProductModal } from "@/hooks/use-add-product-modal";
import { categories, sources } from "@/config/selectOptions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";

// Create zod schema for form validation
const formSchema = z.object({
  title: z.string().nonempty({ message: "Product title is required" }),
  source: z.string().nonempty({ message: "Product source is required" }),
  source_date: z.date({ required_error: "Product source date is required" }),
  source_price: z.coerce
    .number()
    .nonnegative({ message: "Price cannot be negative" }),
  category: z.string().nonempty({ message: "Product category is required" }),
});

const AddProductModal = () => {
  const { toast } = useToast();
  const router = useRouter();
  const modal = useAddProductModal();

  // Define a form using react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      source: "",
      source_date: new Date(),
      source_price: undefined,
      category: "",
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
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
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="What did you purchase?"
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
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a source" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sources?.map((source) => (
                                  <SelectItem
                                    value={source.value}
                                    key={source.title}
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
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
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
                        name="source_price"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="0.01"
                                placeholder="What did you pay?"
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
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories?.map((category) => (
                                  <SelectItem
                                    value={category.title}
                                    key={category.title}
                                  >
                                    <span className="pr-2">
                                      {category.icon}
                                    </span>
                                    {category.title}
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
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
              <Button variant="outline" onClick={() => modal.onClose()}>
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
