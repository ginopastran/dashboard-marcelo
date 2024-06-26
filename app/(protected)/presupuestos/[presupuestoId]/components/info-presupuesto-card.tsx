"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Cliente, Contacto, Presupuesto } from "@prisma/client";

import toast from "react-hot-toast";
import axios from "axios";
import { InfoPresupuestoForm } from "./info-presupuesto-form";

interface ClienteConContacto extends Cliente {
  contacts: Contacto[];
}

interface PresupuestoConCliente extends Presupuesto {
  cliente: ClienteConContacto;
  contact: Contacto | null;
  clienteId: string;
  contactId: string | null;
}

interface InfoPresupuestoProps {
  data: PresupuestoConCliente;
  clients: ClienteConContacto[]; // Ensure you have clients as a prop
}

export const InfoPresupuestoCard: React.FC<InfoPresupuestoProps> = ({
  data,
  clients,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async (newData: Partial<PresupuestoConCliente>) => {
    try {
      // Convert BigInt fields to strings
      const preparedData = {
        ...newData,
        importe: newData.importe?.toString(),
        numero_presupuesto: newData.numero_presupuesto?.toString(),
      };

      const response = await fetch(`/api/presupuestos/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the presupuesto");
      }

      toast.success("Presupuesto actualizado.");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el presupuesto.");
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const transformData = (data: PresupuestoConCliente) => ({
    relevado: data.relevado || "",
    respuesta_presupuesto: data.respuesta_presupuesto || "",
    revision: data.revision || "",
    importe: data.importe || undefined,
    numero_presupuesto: data.numero_presupuesto || undefined,
    via_envio: data.via_envio || "",
  });

  return (
    <div className="w-full">
      <div className="mt-3">
        <div className="bg-white px-7 py-5 rounded-3xl mb-3 w-full flex shadow-lg justify-between flex-col min-h-96">
          <div className="flex w-full h-full justify-between">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-heading-blue text-2xl">
                    Presupuesto
                  </h2>
                </div>
              </div>
              <InfoPresupuestoForm
                onSave={handleSave}
                onCancel={handleCancel}
                initialData={transformData(data)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
