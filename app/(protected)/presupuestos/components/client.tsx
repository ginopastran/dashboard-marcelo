"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cliente, Contacto, EtiquetaCiente, Presupuesto } from "@prisma/client";
import { ClientDataTable } from "@/components/ui/client-data-table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { columns } from "./columns";
import { ClientForm } from "../[presupuestoId]/components/client-form";
import { PresupuestoDataTable } from "@/components/ui/presupuesto-data-table";

// interface ClienteConEtiquetas extends Cliente {
//   label: EtiquetaCiente[];
//   contacts: Contacto[];
// }

interface PresupuestoClientProps {
  data: Presupuesto[];
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
