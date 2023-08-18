"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(3).max(100),
});

const CreateStorePage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const proModal = useProModal();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/store", { name: values.name });

      form.reset();
      router.push(`/dashboard/${response.data.id}`);
      router.refresh();
      toast({
        title: "Success!",
        description: "Your store has been successfully created.",
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
  };

  return (
    <div className="absolute top-0 min-h-screen w-screen bg-[url('../public/background.svg')] md:w-[calc(100vw-18rem)]">
      <div className="flex h-screen items-center justify-center bg-gradient-to-t from-transparent from-80% to-background to-90%">
        <Card className="relative">
          <CardHeader>
            <CardTitle>Create Store</CardTitle>
            <CardDescription>
              What would you llike to call your new store?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="My Awesome Store" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-6" disabled={isLoading}>
                  Create
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateStorePage;
