import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PresupuestoClient } from "./components/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Heading from "./components/heading";

const PresupuestoPage = async ({ params }: { params: { id: string } }) => {
  const clients = await db.cliente.findMany({
    include: { label: true, contacts: true },
    orderBy: {
      client_name: "desc",
    },
  });

  const presupuestos = await db.presupuesto.findMany({
    where: {
      id: params.id,
    },
    include: {
      cliente: {
        include: {
          contacts: true,
        },
      },
      contact: true,
    },
  });

  return (
    <div className="flex-col px-9 bg-secondary-background">
      <nav className=" py-10 flex justify-between items-center w-full pt-20">
        <Heading clients={clients} />
      </nav>
      <div className=" h-[1px] w-full bg-black/60 mb-9" />
      <div className="flex-1 space-y-4">
        <PresupuestoClient data={presupuestos} />
      </div>
    </div>
  );
};

export default PresupuestoPage;
