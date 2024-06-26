"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cliente, Contacto, Presupuesto } from "@prisma/client";
import { ClientDataTable } from "@/components/ui/client-data-table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PresupuestoDataTable } from "@/components/ui/presupuesto-data-table";
import { columns } from "../../components/columns";
import BoxArrowIcon from "@/components/icons/box-arrow";
import Image from "next/image";
import SetttingsIcon from "@/components/icons/settings";
import { PresupuestoForm } from "./client-form";

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

export const PresupuestoCard: React.FC<PresupuestoClientProps> = ({
  data,
  clients,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="mt-12">
        <div className="bg-white px-7 py-5 rounded-3xl mb-3 w-full flex shadow-lg justify-between flex-col">
          <div className=" flex w-full justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-heading-blue text-lg">
                    {data.cliente.client_name}
                  </h2>
                  <span className=" text-xs font-bold text-gray-700">N°20</span>
                </div>
                <h3 className=" text-heading-blue font-medium">{data.name}</h3>
                <div className="flex gap-1">
                  <div className="flex bg-label-purple rounded-full items-center gap-1 mr-2 py-[2px]">
                    <div className="bg-white h-3 w-3 rounded-full items-start ml-1" />
                    <p className="text-white text-xs mr-2">{data.state}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <p className="font-bold text-heading-blue">Responsable:</p>
                  <span className="text-heading-blue font-medium">
                    {data.contact?.contact_client_name || "Sin contacto"}
                  </span>
                </div>
                <div className="flex gap-1">
                  <p className="font-bold text-heading-blue">Creado el</p>
                  <span className="text-heading-blue font-medium">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className=" text-heading-blue flex items-center text-lg font-semibold">
                    <SetttingsIcon className=" mr-2" /> Modificar
                  </button>
                </DialogTrigger>
                <DialogContent className=" max-w-4xl p-0 border-0 gap-0 rounded-3xl min-h-[60vh]">
                  <PresupuestoForm
                    initialData={data}
                    clients={clients} // Pass the clients prop here
                    onClose={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center">
              <Image
                src={"/arquimetal-logo-blue.svg"}
                alt="Arquimetal-Logo-Blue"
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
