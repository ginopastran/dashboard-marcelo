"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cliente, Contacto, EtiquetaCiente } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ClientForm } from "../[clientId]/components/client-form";
import { columns } from "./columns";

interface ClienteConEtiquetas extends Cliente {
  label: EtiquetaCiente[];
  contacts: Contacto[];
}

interface ClientsClientProps {
  data: ClienteConEtiquetas[];
}

export const ClientsClient: React.FC<ClientsClientProps> = ({ data }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 flex gap-1 rounded-xl text-base font-semibold"
              size={"sm"}
            >
              <Plus className="h-4 w-4" />
              Añadir Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className=" max-w-6xl p-0 border-0 gap-0 rounded-3xl min-h-[85vh]">
            <ClientForm
              initialData={null}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} />
      <Separator />
    </>
  );
};
