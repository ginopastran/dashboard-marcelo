import React from "react";
import Heading from "../components/heading";
import { CornerUpLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { PresupuestoCard } from "./components/presupuesto-card";
import Link from "next/link";

const PresupuestoPage = async ({
  params,
}: {
  params: { presupuestoId: string };
}) => {
  const presupuesto = await db.presupuesto.findUnique({
    where: {
      id: params.presupuestoId,
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

  const clients = await db.cliente.findMany({
    include: { label: true, contacts: true },
    orderBy: {
      client_name: "desc",
    },
  });

  console.log(presupuesto);

  return (
    <div className="flex-col px-9 bg-secondary-background">
      <nav className=" py-3 flex justify-between w-full pt-20">
        <div className="flex flex-col items-start gap-12">
          <Link href={"/presupuestos"}>
            <Button
              className="bg-blue-600 flex gap-1 rounded-xl text-base font-semibold"
              size={"sm"}
            >
              Volver a presupuestos
              <CornerUpLeft className=" w-4 h-4" />
            </Button>
          </Link>
          <div className="flex  gap-5 items-end">
            <h1 className=" text-heading-blue text-4xl font-semibold ">
              {presupuesto?.name}
            </h1>
            <span className=" text-heading-blue text-sm font-semibold leading-6">
              {presupuesto?.cliente.client_name}
            </span>
          </div>
        </div>
      </nav>
      <div className=" h-[1px] w-full bg-black/60 mb-9" />
      <div className="flex-1 space-y-4">
        {presupuesto ? (
          <PresupuestoCard data={presupuesto} clients={clients} />
        ) : (
          <p className="text-center text-gray-500">
            Presupuesto no encontrado.
          </p>
        )}
      </div>
    </div>
  );
};

export default PresupuestoPage;
