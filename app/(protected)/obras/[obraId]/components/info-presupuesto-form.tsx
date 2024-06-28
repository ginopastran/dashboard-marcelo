"use client";

import * as z from "zod";
import { useState } from "react";
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
import { EditIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DatePickerField } from "./date-picker";

const formSchema = z.object({
  numero_obra: z.preprocess(
    (val) => (val === "" ? undefined : BigInt(val as string)),
    z.bigint().nullable().optional()
  ),
  numero_presupuesto: z.preprocess(
    (val) => (val === "" ? undefined : BigInt(val as string)),
    z.bigint().nullable().optional()
  ),
  importe: z.preprocess(
    (val) => (val === "" ? undefined : BigInt(val as string)),
    z.bigint().nullable().optional()
  ),
  oc: z.preprocess(
    (val) => (val === "" ? undefined : BigInt(val as string)),
    z.bigint().nullable().optional()
  ),
  url: z.string().optional(),
  fecha: z.date().nullable().optional(),
  saldo: z.preprocess(
    (val) => (val === "" ? undefined : BigInt(val as string)),
    z.bigint().nullable().optional()
  ),
  porcentajePendiente: z
    .preprocess((val) => (val === "" ? undefined : Number(val)), z.number())
    .optional(),
});

type InfoObraFormValues = z.infer<typeof formSchema>;

interface InfoObraFormProps {
  onSave: (newData: Partial<InfoObraFormValues>) => void;
  onCancel: () => void;
  initialData?: Partial<InfoObraFormValues> | null;
}

export const InfoObraForm: React.FC<InfoObraFormProps> = ({
  onSave,
  onCancel,
  initialData,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<InfoObraFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = (data: InfoObraFormValues) => {
    onSave(data);
    setIsEditing(false);
    form.reset(data);
  };

  const inputStyle =
    "bg-transparent border-0 border-b-[1px] border-black rounded-none px-0 focus-visible:ring-0 w-[80%]";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-5 grid-rows-1 gap-3 items-end max-w-4xl">
            <FormField
              control={form.control}
              name="numero_obra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Número Obra
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Número Obra"
                      {...field}
                      type="number"
                      className={inputStyle}
                      disabled={!isEditing}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) => field.onChange(BigInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numero_presupuesto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Número Presupuesto
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Número Presupuesto"
                      {...field}
                      type="number"
                      className={inputStyle}
                      disabled={!isEditing}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) => field.onChange(BigInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="importe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Importe
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Importe"
                      {...field}
                      type="number"
                      className={inputStyle}
                      disabled={!isEditing}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) => field.onChange(BigInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    OC
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="OC"
                      {...field}
                      type="number"
                      className={inputStyle}
                      disabled={!isEditing}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) => field.onChange(BigInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="URL"
                      {...field}
                      className={inputStyle}
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 grid-rows-1 max-w-2xl gap-4 items-end">
            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="fecha"
                      render={({ field }) => (
                        <DatePickerField
                          value={field.value}
                          onChange={field.onChange}
                          disabled={!isEditing}
                          label="Fecha"
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
              name="saldo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Saldo
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Saldo"
                      {...field}
                      type="number"
                      className={inputStyle}
                      disabled={!isEditing}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) => field.onChange(BigInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="porcentajePendiente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    % Pendiente
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="% Pendiente"
                      {...field}
                      type="number"
                      className={inputStyle}
                      disabled={!isEditing}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
