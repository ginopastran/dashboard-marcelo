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
import { DatePickerField } from "./date-picker";

const formSchema = z.object({
  numero_factura: z.number().min(1, "Número de factura es requerido"),
  fecha_factura: z.date().optional(),
  importe: z.preprocess(
    (val) => (val === "" ? undefined : BigInt(val as string)),
    z.bigint().nullable().optional()
  ),
  fecha_aceptado: z.date().optional(),
  carga_portal: z.number().optional(),
  fecha_cobro: z.date().optional(),
  nota_credito: z.preprocess(
    (val) => (val === "" ? undefined : BigInt(val as string)),
    z.bigint().nullable().optional()
  ),
  nota_debito: z.preprocess(
    (val) => (val === "" ? undefined : BigInt(val as string)),
    z.bigint().nullable().optional()
  ),
  recordatorio_cobro: z.number().optional(),
  observaciones: z.string().optional(),
});

type FacturaFormValues = z.infer<typeof formSchema>;

interface FacturaFormProps {
  onSave: (newData: FacturaFormValues) => void;
  onCancel: () => void;
  initialData?: Partial<FacturaFormValues> | null;
}

export const FacturaForm: React.FC<FacturaFormProps> = ({
  onSave,
  onCancel,
  initialData,
}) => {
  const form = useForm<FacturaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = (data: FacturaFormValues) => {
    onSave(data);
    form.reset(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="numero_factura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Factura</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                        label="Fecha de Factura"
                        value={field.value}
                        onChange={field.onChange}
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
                <FormLabel>Importe</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    value={field.value !== undefined ? String(field.value) : ""}
                    onChange={(e) => field.onChange(BigInt(e.target.value))}
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
                <FormLabel>Carga Portal</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    value={field.value !== undefined ? String(field.value) : ""}
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
                        label="Fecha de Cobro"
                        value={field.value}
                        onChange={field.onChange}
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
            name="nota_credito"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nota de Crédito</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    value={field.value !== undefined ? String(field.value) : ""}
                    onChange={(e) => field.onChange(BigInt(e.target.value))}
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
                <FormLabel>Nota de Débito</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    value={field.value !== undefined ? String(field.value) : ""}
                    onChange={(e) => field.onChange(BigInt(e.target.value))}
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
                <FormLabel>Recordatorio de Cobro</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    value={field.value !== undefined ? String(field.value) : ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observaciones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
};
