"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Contacto } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  contact_client_name: z.string().min(2),
  contact_job_title: z.string().optional(),
  contact_DNI: z.string().optional(),
  contact_contact: z.string().optional(),
  contact_email: z.string().email().optional(),
  contact_other: z.string().optional(),
});

type ContactFormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSave: (newContact: Partial<Contacto>) => void;
  onCancel: () => void;
  initialData?: Partial<Contacto> | null;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSave,
  onCancel,
  initialData,
}) => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact_client_name: initialData?.contact_client_name || "",
      contact_job_title: initialData?.contact_job_title || "",
      contact_DNI: initialData?.contact_DNI?.toString() || "",
      contact_contact: initialData?.contact_contact?.toString() || "",
      contact_email: initialData?.contact_email || "",
      contact_other: initialData?.contact_other || "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    onSave({
      ...initialData,
      contact_client_name: data.contact_client_name,
      contact_job_title: data.contact_job_title,
      contact_DNI: BigInt(data.contact_DNI || 0),
      contact_contact: BigInt(data.contact_contact || 0),
      contact_email: data.contact_email,
      contact_other: data.contact_other,
    });
    form.reset();
  };

  const inputStyle =
    " bg-transparent border-0 border-b-[1px] border-black rounded-none px-0 focus-visible:ring-0 w-[80%]";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative"
      >
        <div className="flex">
          <FormField
            control={form.control}
            name="contact_client_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Nombre del Contacto"
                    {...field}
                    className={inputStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_job_title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Cargo"
                    {...field}
                    className={inputStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_DNI"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="DNI" {...field} className={inputStyle} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_contact"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Contacto"
                    {...field}
                    className={inputStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className={inputStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_other"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Otros"
                    {...field}
                    className={inputStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="absolute flex items-center justify-end space-x-2 py-4 -bottom-24 right-0">
          <Button
            onClick={onCancel}
            size={"sm"}
            className=" bg-blue-button text-white rounded-xl font-semibold text-base px-6 "
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="outline"
            className=" border-blue-button border-2 rounded-xl text-blue-button font-semibold text-base px-6 hover:bg-blue-button hover:text-white"
            size={"sm"}
          >
            Confirmar
          </Button>
        </div>
      </form>
    </Form>
  );
};
