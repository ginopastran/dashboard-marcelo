"use client";

import * as z from "zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { DatePickerField } from "./date-picker"; // Adjust the import path
import { EditIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Contacto } from "@prisma/client";

const formSchema = z.object({
  contact_contact: z.preprocess(
    (val) => Number(val),
    z.number().nullable().optional()
  ),
  recepcion: z.date().nullable().optional(),
  via_recepcion: z.string().optional(),
  detalle: z.string().optional(),
  licitacion: z.date().nullable().optional(),
  locacion: z.string().optional(),
  sector: z.string().optional(),
});

type ResponsableFormValues = z.infer<typeof formSchema>;

interface ResponsableFormProps {
  onSave: (newData: Partial<ResponsableFormValues>) => void;
  onSaveContact: (newContact: Partial<Contacto>) => void;
  onCancel: () => void;
  initialData?: Partial<ResponsableFormValues> | null;
  contact: {
    contact_contact: number | null;
  };
}

export const ResponsableForm: React.FC<ResponsableFormProps> = ({
  onSave,
  onSaveContact,
  onCancel,
  initialData,
  contact,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize the form with initialData and contact_contact from contact
  const form = useForm<ResponsableFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact_contact:
        contact?.contact_contact || initialData?.contact_contact || undefined,
      recepcion: initialData?.recepcion || undefined,
      via_recepcion: initialData?.via_recepcion || "",
      detalle: initialData?.detalle || "",
      licitacion: initialData?.licitacion || undefined,
      locacion: initialData?.locacion || "",
      sector: initialData?.sector || "",
    },
  });

  useEffect(() => {
    if (contact?.contact_contact !== undefined) {
      form.setValue("contact_contact", contact.contact_contact);
    }
  }, [contact, form]);

  const onSubmit = (data: ResponsableFormValues) => {
    onSave(data);

    onSaveContact({
      contact_contact: data.contact_contact
        ? BigInt(data.contact_contact)
        : undefined,
    });
    setIsEditing(false);
    form.reset(data);
  };

  const inputStyle =
    "bg-transparent border-0 border-b-[1px] border-black rounded-none px-0 focus-visible:ring-0 w-[80%]";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-3 grid-rows-1 gap-4 items-end">
            <FormField
              control={form.control}
              name="contact_contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Teléfono
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Teléfono"
                      {...field}
                      type="number"
                      className={inputStyle}
                      disabled={!isEditing} // Pass disabled prop
                      value={field.value ?? ""} // Ensure value is not null
                      onChange={(e) => field.onChange(Number(e.target.value))} // Ensure the value is a number
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recepcion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="recepcion"
                      render={({ field }) => (
                        <DatePickerField
                          label="Recep."
                          value={field.value}
                          onChange={field.onChange}
                          disabled={!isEditing} // Pass disabled prop
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="via_recepcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Via Recep.
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vía de Recepción"
                      {...field}
                      className={inputStyle}
                      disabled={!isEditing} // Pass disabled prop
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-1 items-end">
            <FormField
              control={form.control}
              name="detalle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Detalle
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Detalle"
                      {...field}
                      className={inputStyle}
                      disabled={!isEditing} // Pass disabled prop
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licitacion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="licitacion"
                      render={({ field }) => (
                        <DatePickerField
                          label="Licitación"
                          value={field.value}
                          onChange={field.onChange}
                          disabled={!isEditing} // Pass disabled prop
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <FormField
              control={form.control}
              name="locacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Obra/Locación
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Locación"
                      {...field}
                      className={inputStyle}
                      disabled={!isEditing} // Pass disabled prop
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Sector
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sector"
                      {...field}
                      className={inputStyle}
                      disabled={!isEditing} // Pass disabled prop
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {isEditing ? (
          <div className="flex items-center justify-end space-x-2 pt-4">
            <Button
              onClick={(e) => {
                e.preventDefault();
                form.reset();
                setIsEditing(false);
              }}
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
        ) : (
          <div className=" flex items-center justify-end pt-4">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
              size={"sm"}
              className=" bg-transparent hover:bg-transparent text-heading-blue rounded-xl font-semibold  px-6 gap-1 text-lg"
              disabled={isEditing}
            >
              <EditIcon className="w-5 h-5 text-blue-button" />
              Editar
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
