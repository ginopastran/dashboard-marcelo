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

const formSchema = z.object({
  relevado: z.string().optional(),
  respuesta_presupuesto: z.string().optional(),
  revision: z.string().optional(),
  importe: z.preprocess(
    (val) => (val === "" ? undefined : BigInt(val as string)),
    z.bigint().nullable().optional()
  ),
  numero_presupuesto: z.preprocess(
    (val) => (val === "" ? undefined : BigInt(val as string)),
    z.bigint().nullable().optional()
  ),
  via_envio: z.string().optional(),
});

type InfoPresupuestoFormValues = z.infer<typeof formSchema>;

interface InfoPresupuestoFormProps {
  onSave: (newData: Partial<InfoPresupuestoFormValues>) => void;
  onCancel: () => void;
  initialData?: Partial<InfoPresupuestoFormValues> | null;
}

export const InfoPresupuestoForm: React.FC<InfoPresupuestoFormProps> = ({
  onSave,
  onCancel,
  initialData,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<InfoPresupuestoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = (data: InfoPresupuestoFormValues) => {
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
          <div className="grid grid-cols-3 grid-rows-1 gap-4 items-end">
            <FormField
              control={form.control}
              name="relevado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Relevado
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Relevado"
                      {...field}
                      className={inputStyle}
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="respuesta_presupuesto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Respuesta Presupuesto
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Respuesta Presupuesto"
                      {...field}
                      className={inputStyle}
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="revision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Revisión
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Revisión"
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
          <div className="grid grid-cols-2 grid-rows-1 gap-4 items-end">
            <FormField
              control={form.control}
              name="importe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
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
              name="numero_presupuesto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
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
          </div>
          <div className="grid grid-cols-2 grid-rows-1 gap-4 items-end">
            <FormField
              control={form.control}
              name="via_envio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold text-heading-blue",
                      !isEditing && " text-stone-600"
                    )}
                  >
                    Vía Envío
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vía Envío"
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
