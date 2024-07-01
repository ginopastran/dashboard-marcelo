"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEffect } from "react";

const formSchema = z.object({
  fecha_factura: z.date().nullable().optional(),
  importe: z
    .preprocess(
      (val) => (val === "" || val === null ? null : BigInt(val as string)),
      z.bigint().nullable()
    )
    .optional(),
  fecha_aceptado: z.date().nullable().optional(),
  carga_portal: z.number().nullable().optional(),
  fecha_cobro: z.date().nullable().optional(),
  nota_credito: z
    .preprocess(
      (val) => (val === "" || val === null ? null : BigInt(val as string)),
      z.bigint().nullable()
    )
    .optional(),
  nota_debito: z
    .preprocess(
      (val) => (val === "" || val === null ? null : BigInt(val as string)),
      z.bigint().nullable()
    )
    .optional(),
  recordatorio_cobro: z.number().nullable().optional(),
});

type FacturaFormValues = z.infer<typeof formSchema>;

interface FacturaFormProps {
  onSave: (newData: FacturaFormValues) => void;
  onCancel: () => void;
  initialData?: Partial<FacturaFormValues> | null;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const FacturaForm: React.FC<FacturaFormProps> = ({
  onSave,
  onCancel,
  initialData,
  isEditing,
  setIsEditing,
}) => {
  const form = useForm<FacturaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    const sanitizedData = {
      ...initialData,
      importe: initialData?.importe
        ? BigInt(initialData.importe.toString())
        : null,
      nota_credito: initialData?.nota_credito
        ? BigInt(initialData.nota_credito.toString())
        : null,
      nota_debito: initialData?.nota_debito
        ? BigInt(initialData.nota_debito.toString())
        : null,
    };
    form.reset(sanitizedData);
  }, [initialData]);

  const onSubmit = (data: FacturaFormValues) => {
    onSave(data);
    form.reset(data);
  };

  const inputStyle =
    "bg-transparent border-0 border-b-[1px] border-black rounded-none px-0 focus-visible:ring-0 w-[80%]";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-5 grid-rows-1 gap-3 items-end max-w-4xl">
            <FormField
              control={form.control}
              name="fecha_factura"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="fecha_factura"
                      render={({ field }) => (
                        <DatePickerField
                          label="Fecha Factura"
                          value={field.value}
                          onChange={field.onChange}
                          disabled={!isEditing}
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
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? null : BigInt(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fecha_aceptado"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="fecha_aceptado"
                      render={({ field }) => (
                        <DatePickerField
                          label="Fecha Aceptado"
                          value={field.value}
                          onChange={field.onChange}
                          disabled={!isEditing}
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
              name="carga_portal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Carga Portal
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Carga Portal"
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
            <FormField
              control={form.control}
              name="fecha_cobro"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="fecha_cobro"
                      render={({ field }) => (
                        <DatePickerField
                          label="Fecha Cobro"
                          value={field.value}
                          onChange={field.onChange}
                          disabled={!isEditing}
                        />
                      )}
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
              name="nota_credito"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Nota Crédito
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nota Crédito"
                      {...field}
                      type="number"
                      className={inputStyle}
                      disabled={!isEditing}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? null : BigInt(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nota_debito"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Nota Débito
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nota Débito"
                      {...field}
                      type="number"
                      className={inputStyle}
                      disabled={!isEditing}
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? null : BigInt(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recordatorio_cobro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-sm font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Recordatorio Cobro
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Recordatorio Cobro"
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
          <div className="flex items-center justify-end space-x-2 pb-4">
            <Button
              onClick={(e) => {
                e.preventDefault();
                form.reset();
                onCancel();
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
          <div className=" flex items-center justify-end pb-4">
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
