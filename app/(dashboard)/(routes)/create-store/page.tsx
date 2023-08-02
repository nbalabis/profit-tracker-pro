"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

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
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(3).max(100),
});

const CreateStorePage = () => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      await axios.post("/api/store", { name: values.name });

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // TODO: Open Upgrade Modal
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error?.response?.data || "Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a Store</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateStorePage;
