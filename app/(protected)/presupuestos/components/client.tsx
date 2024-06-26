"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Cliente, Contacto, EtiquetaCiente, Presupuesto } from "@prisma/client";
import { columns } from "./columns";
import { PresupuestoDataTable } from "@/components/ui/presupuesto-data-table";

interface ClienteConContacto extends Cliente {
  contacts: Contacto[];
}

interface PresupuestoConCliente extends Presupuesto {
  cliente: ClienteConContacto;
}

interface PresupuestoClientProps {
  data: PresupuestoConCliente[];
}

export const PresupuestoClient: React.FC<PresupuestoClientProps> = ({
  data,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <PresupuestoDataTable data={data} columns={columns} />
    </>
  );
};
