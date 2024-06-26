"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Cliente, Contacto, Presupuesto } from "@prisma/client";

import { ResponsableForm } from "./responsable-form";
import toast from "react-hot-toast";
import axios from "axios";

interface ClienteConContacto extends Cliente {
  contacts: Contacto[];
}

interface PresupuestoConCliente extends Presupuesto {
  cliente: ClienteConContacto;
  contact: Contacto | null;
  clienteId: string;
  contactId: string | null;
}

interface PresupuestoClientProps {
  data: PresupuestoConCliente;
  clients: ClienteConContacto[]; // Ensure you have clients as a prop
}

export const ResponsableCard: React.FC<PresupuestoClientProps> = ({
  data,
  clients,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async (newData: Partial<PresupuestoConCliente>) => {
    try {
      const response = await fetch(`/api/presupuestos/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the presupuesto");
      }

      toast.success("Contacto Responsable editado.");
      router.refresh();
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show a notification)
    }
  };

  const handleSaveContact = async (newContact: Partial<Contacto>) => {
    try {
      // Fetch existing contact details to preserve existing email if not provided
      const existingContactResponse = await axios.get(
        `/api/clients/${data.clienteId}/contacts/${data.contact?.id}`
      );
      const existingContact = existingContactResponse.data;

      const contactToSave = {
        contact_client_name:
          newContact.contact_client_name ||
          existingContact.contact_client_name ||
          "",
        contact_job_title:
          newContact.contact_job_title ||
          existingContact.contact_job_title ||
          "",
        contact_DNI: newContact.contact_DNI
          ? newContact.contact_DNI.toString()
          : existingContact.contact_DNI,
        contact_contact: newContact.contact_contact
          ? newContact.contact_contact.toString()
          : existingContact.contact_contact,
        contact_email:
          newContact.contact_email || existingContact.contact_email, // Preserve existing email
        contact_other:
          newContact.contact_other || existingContact.contact_other || "",
      };

      if (data.contact?.id) {
        await axios.patch(
          `/api/clients/${data.clienteId}/contacts/${data.contact.id}`,
          contactToSave
        );
        toast.success("Contacto actualizado exitosamente.");
      }

      router.refresh();
    } catch (error) {
      toast.error("Error al guardar el contacto.");
      console.log(error);
    }
  };

  const handleCancel = () => {
    // Handle cancel (e.g., close the dialog or reset the form)
    setIsDialogOpen(false);
  };

  const transformData = (data: PresupuestoConCliente) => ({
    contact_contact: data.contact?.contact_contact
      ? Number(data.contact.contact_contact)
      : null,
    recepcion: data.recepcion || undefined,
    via_recepcion: data.via_recepcion || "",
    detalle: data.detalle || "",
    licitacion: data.licitacion || undefined,
    locacion: data.locacion || "",
    sector: data.sector || "",
  });

  return (
    <div>
      <div className="mt-12">
        <div className="bg-white px-7 py-5 rounded-3xl mb-3 w-1/2 flex shadow-lg justify-between flex-col min-h-96">
          <div className="flex w-full h-full justify-between">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-heading-blue text-2xl">
                    Contacto Responsable
                  </h2>
                </div>
              </div>
              <ResponsableForm
                onSave={handleSave}
                onSaveContact={handleSaveContact}
                onCancel={handleCancel}
                initialData={transformData(data)}
                contact={{
                  contact_contact: data.contact?.contact_contact
                    ? Number(data.contact.contact_contact)
                    : null,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
