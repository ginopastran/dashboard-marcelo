"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cliente, Contacto, Obra } from "@prisma/client";
import { ClientDataTable } from "@/components/ui/client-data-table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { columns } from "../../components/columns";
import BoxArrowIcon from "@/components/icons/box-arrow";
import Image from "next/image";
import SetttingsIcon from "@/components/icons/settings";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { ObraForm } from "./obra-form";

interface ClienteConContacto extends Cliente {
  contacts: Contacto[];
}

interface ObraConCliente extends Obra {
  cliente: ClienteConContacto;
  contact: Contacto | null;
  clienteId: string;
  contactId: string | null;
}

interface ObraClientProps {
  data: ObraConCliente;
  clients: ClienteConContacto[]; // Ensure you have clients as a prop
}

const stateMapping: { [key: string]: string } = {
  "Sin Comenzar": "SinComenzar",
  "En Proceso": "EnProceso",
  Finalizado: "Finalizado",
};

export const ObraCard: React.FC<ObraClientProps> = ({ data, clients }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleStateChange = async (id: string, newState: string) => {
    const mappedState = stateMapping[newState];
    try {
      const response = await fetch(`/api/obras/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: mappedState }),
      });

      if (response.ok) {
        toast.success("Estado actualizado correctamente.");
        router.refresh();
      } else {
        toast.error("Error actualizando el estado");
      }
    } catch (error) {
      console.error("Error updating state:", error);
    }
  };

  const states = Object.keys(stateMapping);

  const getBgColorClass = (state: string | null | undefined) => {
    switch (state) {
      case "SinComenzar":
        return "bg-label-purple";
      case "EnProceso":
        return "bg-yellow-500";
      case "Finalizado":
        return "bg-green-500";
      default:
        return "bg-label-purple";
    }
  };

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
                  <div
                    className={cn(
                      "flex rounded-full items-center gap-1 mr-2 py-[2px]",
                      getBgColorClass(data.state)
                    )}
                  >
                    <div className="bg-white h-2 w-2 rounded-full items-start ml-1" />
                    <Select
                      value={
                        Object.keys(stateMapping).find(
                          (key) => stateMapping[key] === data.state
                        ) || "Sin Comenzar"
                      }
                      onValueChange={(newState) =>
                        handleStateChange(data.id, newState)
                      }
                    >
                      <SelectTrigger className="text-white text-xs mr-2 p-0 py-2 border-none m-0 h-2 focus:ring-0 font-semibold">
                        <SelectValue
                          placeholder={
                            Object.keys(stateMapping).find(
                              (key) => stateMapping[key] === data.state
                            ) || "Sin Comenzar"
                          }
                          className=" p-0 border-none m-0"
                        />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                  <ObraForm
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
