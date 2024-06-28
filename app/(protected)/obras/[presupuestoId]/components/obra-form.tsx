"use client";

import { useState, useEffect } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Cliente, Contacto, EtiquetaCiente } from "@prisma/client";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  clientId: z.string().min(1, "Debe seleccionar un cliente"),
  contactId: z.string().optional(),
  name: z.string().min(2, "Debe ingresar un nombre para el presupuesto"),
});

type ClientFormValues = z.infer<typeof formSchema>;

interface ClienteConEtiquetas extends Cliente {
  contacts: Contacto[];
}

interface PresupuestoConClienteYContactos {
  id: string;
  name: string;
  clienteId: string;
  contactId: string | null;
  cliente: ClienteConEtiquetas;
}

interface ClientFormProps {
  initialData: PresupuestoConClienteYContactos | null;
  clients: ClienteConEtiquetas[];
  onClose: () => void;
}

export const ObraForm: React.FC<ClientFormProps> = ({
  initialData,
  clients,
  onClose,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(
    initialData?.clienteId || null
  );
  const [contacts, setContacts] = useState<Contacto[]>(
    initialData?.cliente.contacts || []
  );

  const title = initialData ? "Editar Obra" : "Nueva Obra";
  const toastMessage = initialData ? "Obra actualizada." : "Obra creada.";
  const action = initialData ? "Guardar cambios" : "Confirmar";

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: initialData?.clienteId || "",
      contactId: initialData?.contactId || "", // Ensure this is properly initialized
      name: initialData?.name || "",
    },
  });

  useEffect(() => {
    if (selectedClient) {
      const client = clients.find((c) => c.id === selectedClient);
      setContacts(client?.contacts || []);
    }
  }, [selectedClient, clients]);

  const onSubmit = async (data: ClientFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/presupuestos/${initialData.id}`, data);
      } else {
        await axios.post(`/api/presupuestos`, data);
      }
      router.refresh();
      router.push(`/presupuestos`);
      toast.success(toastMessage);
      onClose();
    } catch (error: any) {
      toast.error("Algo salió mal.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.delete(`/api/presupuestos/${initialData.id}`);
      }
      router.refresh();
      router.push(`/presupuestos`);
      toast.success("Presupuesto eliminado.");
    } catch (error: any) {
      toast.error(
        "Asegúrese de eliminar primero todas las dependencias de este presupuesto."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const inputStyle =
    "bg-transparent border-0 border-b-[1px] border-black rounded-none px-0 focus-visible:ring-0 focus:ring-0";

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full flex flex-col gap-8 h-full mb-8 bg-secondary-background rounded-2xl px-6"
        >
          <div className="p-10 text-heading-blue font-bold text-4xl">
            <h1>{title}</h1>
          </div>
          <div className="flex flex-col gap-8 bg-secondary-background w-full px-10 rounded-bl-2xl rounded-l-2xl">
            <div className="grid grid-cols-2 grid-rows-1 gap-8">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">Cliente</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedClient(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className={inputStyle}>
                          <SelectValue placeholder="Seleccionar cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.client_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">Contacto</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        disabled={!selectedClient || loading}
                      >
                        <SelectTrigger className={inputStyle}>
                          <SelectValue placeholder="Seleccionar contacto" />
                        </SelectTrigger>
                        <SelectContent>
                          {contacts.map((contact) => (
                            <SelectItem key={contact.id} value={contact.id}>
                              {contact.contact_client_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">
                    Nombre de la Obra o Proyecto
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nombre de la Obra o Proyecto"
                      {...field}
                      className={inputStyle}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center absolute bottom-5 left-6">
            <Image
              src={"/arquimetal-logo-blue.svg"}
              alt="Arquimetal-Logo-Blue"
              width={45}
              height={45}
            />
          </div>
          <div className="flex flex-col gap-8 px-10 py-14 rounded-bl-2xl rounded-l-2xl">
            <div className="flex items-end justify-end absolute bottom-5 right-6 gap-3">
              <Button
                disabled={loading}
                className="bg-blue-button py-1 px-6 rounded-xl tracking-wide"
                type="submit"
                size={"sm"}
              >
                {action}
              </Button>
              {initialData && (
                <div className="flex items-center justify-between">
                  <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                    className="rounded-xl"
                    type="button"
                  >
                    Eliminar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
