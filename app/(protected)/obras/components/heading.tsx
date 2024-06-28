"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { ObraForm } from "../[presupuestoId]/components/obra-form";
import { Cliente, Contacto, EtiquetaCiente } from "@prisma/client";

interface ClienteConEtiquetas extends Cliente {
  label: EtiquetaCiente[];
  contacts: Contacto[];
}

interface HeadingProps {
  clients: ClienteConEtiquetas[];
}

const Heading: React.FC<HeadingProps> = ({ clients }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex items-center gap-12">
      <h1 className=" text-heading-blue text-4xl font-semibold">
        Gestión de Obras
      </h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-blue-600 flex gap-1 rounded-xl text-base font-semibold"
            size={"sm"}
          >
            <Plus className="h-4 w-4" />
            Nueva Obra
          </Button>
        </DialogTrigger>
        <DialogContent className=" max-w-4xl p-0 border-0 gap-0 rounded-3xl min-h-[60vh]">
          <ObraForm
            initialData={null}
            clients={clients}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Heading;
