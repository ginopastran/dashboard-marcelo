import { db } from "@/lib/db";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PresupuestoClient } from "./components/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ClientForm } from "./[presupuestoId]/components/client-form";

const ClientsPage = async ({ params }: { params: { id: string } }) => {
  const clients = await db.cliente.findMany({
    where: {
      id: params.id,
    },
    include: { label: true, contacts: true },
    orderBy: {
      client_name: "desc",
    },
  });

  const presupuestos = await db.presupuesto.findMany({
    where: {
      id: params.id,
    },
    include: { cliente: true },
  });

  // console.log(clients);

  return (
    <div className="flex-col px-9 bg-secondary-background">
      <nav className=" py-10 flex justify-between items-center w-full pt-20">
        <div className="flex items-center gap-12">
          <h1 className=" text-heading-blue text-4xl font-semibold">
            Presupuestos
          </h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-blue-600 flex gap-1 rounded-xl text-base font-semibold"
                size={"sm"}
              >
                <Plus className="h-4 w-4" />
                Nuevo Presupuesto
              </Button>
            </DialogTrigger>
            <DialogContent className=" max-w-6xl p-0 border-0 gap-0 rounded-3xl min-h-[85vh]">
              <ClientForm initialData={null} />
            </DialogContent>
          </Dialog>
        </div>
      </nav>
      {/* <Separator/> */}
      <div className=" h-[1px] w-full bg-black/60 mb-9" />
      <div className="flex-1 space-y-4 py-8 pt-2">
        <PresupuestoClient data={presupuestos} />
      </div>
    </div>
  );
};

export default ClientsPage;
