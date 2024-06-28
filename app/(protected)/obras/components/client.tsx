"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Cliente,
  Contacto,
  EtiquetaCiente,
  Obra,
  Presupuesto,
} from "@prisma/client";
import { columns } from "./columns";
import { ObraDataTable } from "@/components/ui/obra-data-table";

interface ClienteConContacto extends Cliente {
  contacts: Contacto[];
}

interface ObraConCliente extends Obra {
  cliente: ClienteConContacto;
}

interface ObraClientProps {
  data: ObraConCliente[];
}

export const ObraClient: React.FC<ObraClientProps> = ({ data }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <ObraDataTable data={data} columns={columns} />
    </>
  );
};
