"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Cliente, Contacto, Obra } from "@prisma/client";

import toast from "react-hot-toast";
import axios from "axios";
import { InfoObraForm } from "./info-presupuesto-form";

interface ClienteConContacto extends Cliente {
  contacts: Contacto[];
}

interface ObraConCliente extends Obra {
  cliente: ClienteConContacto;
  contact: Contacto | null;
  clienteId: string;
  contactId: string | null;
}

interface InfoPresupuestoProps {
  data: ObraConCliente;
  clients: ClienteConContacto[]; // Ensure you have clients as a prop
}

export const InfoPresupuestoCard: React.FC<InfoPresupuestoProps> = ({
  data,
  clients,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  interface InfoObraFormValues {
    numero_obra?: bigint | null;
    numero_presupuesto?: bigint | null;
    importe?: bigint | null;
    oc?: bigint | null;
    url?: string;
    fecha?: Date | null;
    saldo?: bigint | null;
    porcentajePendiente?: number;
  }

  const handleSave = async (newData: Partial<InfoObraFormValues>) => {
    try {
      // Convert BigInt fields to strings
      const preparedData = {
        ...newData,
        importe: newData.importe?.toString(),
        numero_presupuesto: newData.numero_presupuesto?.toString(),
        numero_obra: newData.numero_obra?.toString(),
        oc: newData.oc?.toString(),
        saldo: newData.saldo?.toString(),
      };

      const response = await fetch(`/api/obras/${data.id}`, {
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

  const transformData = (
    data: ObraConCliente
  ): Partial<InfoObraFormValues> => ({
    numero_obra: data.numero_obra,
    numero_presupuesto: data.numero_presupuesto,
    importe: data.importe,
    oc: data.oc,
    url: data.url || undefined,
    fecha: data.fecha,
    saldo: data.saldo,
    porcentajePendiente:
      data.porcentajePendiente !== null ? data.porcentajePendiente : undefined,
  });

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full">
      <div className="mt-3">
        <div className="bg-white px-7 py-5 rounded-3xl mb-3 w-full flex h-full shadow-lg justify-between flex-col ">
          <div className="flex w-full h-full justify-between">
            <div className="flex flex-col gap-3 w-full">
              <InfoObraForm
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
