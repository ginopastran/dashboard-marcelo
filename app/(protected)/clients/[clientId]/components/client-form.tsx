"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Cliente } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

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
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  id: z.string().optional(),
  clientName: z.string().min(2),
  industry: z.string().optional(),
  responsibleName: z.string().optional(),
  jobTitle: z.string().optional(),
  contact: z.string().optional(), // Change to string
  dni: z.string().optional(), // Change to string
  email: z.string().email().optional(),
  other: z.string().optional(),
});

type ClientFormValues = z.infer<typeof formSchema>;

interface ClientFormProps {
  initialData: Cliente | null;
  onClose: () => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  initialData,
  onClose,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar Cliente" : "Crear Cliente";
  const description = initialData
    ? "Editar los detalles del cliente."
    : "Añadir un nuevo cliente.";
  const toastMessage = initialData ? "Cliente actualizado." : "Cliente creado.";
  const action = initialData ? "Guardar cambios" : "Crear";

  const transformedInitialData = initialData
    ? {
        id: initialData.id,
        clientName: initialData.client_name,
        industry: initialData.industry || "",
        responsibleName: initialData.responsible_name || "",
        jobTitle: initialData.job_title || "",
        contact: initialData.contact ? initialData.contact.toString() : "", // Convert to string
        dni: initialData.DNI ? initialData.DNI.toString() : "", // Convert to string
        email: initialData.email || "",
        other: initialData.other || "",
      }
    : {
        clientName: "",
        industry: "",
        responsibleName: "",
        jobTitle: "",
        contact: "",
        dni: "",
        email: "",
        other: "",
      };

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: transformedInitialData,
  });

  const onSubmit = async (data: ClientFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/clients/${initialData.id}`, data);
      } else {
        await axios.post(`/api/clients`, data);
      }
      router.refresh();
      router.push(`/clients`);
      toast.success(toastMessage);
      onClose(); // Cerrar el diálogo en caso de envío exitoso
    } catch (error: any) {
      toast.error("Algo salió mal.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/clients/${params.clientId}`);
      router.refresh();
      router.push(`/clients`);
      toast.success("Cliente eliminado.");
    } catch (error: any) {
      toast.error(
        "Asegúrese de eliminar primero todas las dependencias de este cliente."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nombre del cliente"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Email del cliente"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industria</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Industria"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsibleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Responsable</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nombre del Responsable"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del Trabajo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Título del Trabajo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacto</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Contacto"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="DNI"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otros</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Otros detalles"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
