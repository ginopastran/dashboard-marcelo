import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Cliente, Contacto, Obra, Presupuesto } from "@prisma/client";
import Image from "next/image";
import { Collapsible, CollapsibleContent } from "./collapsible";
import BoxArrowIcon from "../icons/box-arrow";
import { Button } from "./button";
import { useRouter } from "next/navigation";

interface ClienteConContacto extends Cliente {
  contacts: Contacto[];
}

interface ObraConCliente extends Obra {
  cliente: ClienteConContacto;
  contact?: Contacto | null;
}

interface DataTableProps {
  data: ObraConCliente[];
  columns: ColumnDef<Contacto>[];
}

export function ObraDataTable({ data, columns }: DataTableProps) {
  const router = useRouter();

  const [openCollapsibles, setOpenCollapsibles] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingContact, setEditingContact] =
    useState<Partial<Contacto> | null>(null);
  const [selectedClient, setSelectedClient] = useState<Presupuesto | null>(
    null
  );

  const toggleCollapsible = (index: number) => {
    setOpenCollapsibles((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  const formatDNI = (dni: bigint) => {
    const dniStr = dni.toString();
    return dniStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      <div className="mt-12">
        {data.map((item, id) => (
          <div
            key={id}
            className="bg-white px-7 py-5 rounded-3xl mb-3 w-full flex shadow-lg justify-between flex-col"
          >
            <div className=" flex w-full justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-end gap-2">
                    <h2 className="font-bold text-heading-blue text-xl">
                      {item.cliente.client_name}
                    </h2>
                    <span className=" text-xs font-bold text-gray-700 leading-6">
                      N°20
                    </span>
                  </div>
                  <h3 className=" text-heading-blue font-medium">
                    {item.name}
                  </h3>
                  <div className="flex gap-1">
                    <div className="flex bg-label-purple rounded-full items-center gap-1 mr-2 py-[2px]">
                      <div className="bg-white h-3 w-3 rounded-full items-start ml-1" />
                      <p className="text-white text-xs mr-2">{item.state}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-1">
                    <p className="font-bold text-heading-blue">Responsable:</p>
                    <span className="text-heading-blue font-medium">
                      {item.contact?.contact_client_name || "Sin contacto"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-bold text-heading-blue">Creado el</p>
                    <span className="text-heading-blue font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <button
                  className=" text-heading-blue flex items-center text-lg font-semibold"
                  onClick={() => router.push(`/obras/${item.id}`)}
                >
                  <BoxArrowIcon className=" mr-2" /> Ver Información
                </button>
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
        ))}
      </div>
    </div>
  );
}
