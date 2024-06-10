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
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  const action = initialData ? "Guardar cambios" : "Confirmar";

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
      if (initialData) {
        await axios.delete(`/api/clients/${initialData.id}`);
      }
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

  const inputStyle =
    " bg-transparent border-0 border-b-[1px] border-black rounded-none px-0 focus-visible:ring-0";

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      {/* <Separator /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full flex gap-8 h-full mb-8"
        >
          <div className="flex flex-col gap-8 bg-secondary-background w-[30%] px-10 py-14  rounded-bl-2xl rounded-l-2xl">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-slate-600">Cliente</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nombre del cliente"
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
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-slate-600">Industria</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Industria"
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
              name="responsibleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-slate-600">Responsable</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nombre del Responsable"
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
              name="responsibleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-slate-600">Etiquetas</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="TODO: HACER ESTO"
                      {...field}
                      className=" border-black border rounded-xl focus-visible:ring-0"
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
          <div className="flex flex-col gap-8 px-10 py-14  rounded-bl-2xl rounded-l-2xl ">
            <div className=" flex gap-8">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-slate-600">Cargo</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Cargo del Contacto"
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
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-slate-600">DNI</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="D.N.I."
                        type="number"
                        {...field}
                        className={inputStyle}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-slate-600">Contacto</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Contacto"
                        type="number"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-slate-600">Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Email del cliente"
                        {...field}
                        className={inputStyle}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-slate-600">Otros</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Otros detalles"
                        {...field}
                        className={inputStyle}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-end justify-end absolute bottom-5 right-6 gap-3">
              <Button
                disabled={loading}
                className=" bg-blue-button py-1 px-6 rounded-xl tracking-wide"
                type="submit"
                size={"sm"}
              >
                {action}
              </Button>
              {initialData && (
                <div className="flex items-center justify-between">
                  {initialData && (
                    <Button
                      disabled={loading}
                      variant="destructive"
                      size="sm"
                      onClick={() => setOpen(true)}
                      className=" rounded-xl"
                      type="button"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
