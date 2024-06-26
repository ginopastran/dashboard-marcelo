import React from "react";
import { CornerUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { ResponsableCard } from "./components/responsable-card";
import { InfoPresupuestoCard } from "./components/info-presupuesto-card";
import { ObraCard } from "./components/presupuesto-card";
import Facturas from "./components/facturas";

const ObraPage = async ({ params }: { params: { obraId: string } }) => {
  const obra = await db.obra.findUnique({
    where: {
      id: params.obraId,
    },
    include: {
      cliente: {
        include: {
          contacts: true,
        },
      },
      contact: true,
      facturas: true, // Asegúrate de incluir las facturas
    },
  });

  const clients = await db.cliente.findMany({
    include: { label: true, contacts: true },
    orderBy: {
      client_name: "desc",
    },
  });

  return (
    <div className="flex-col px-9 bg-secondary-background">
      <nav className=" py-3 flex justify-between w-full pt-20">
        <div className="flex flex-col items-start gap-12">
          <Link href={"/obras"}>
            <Button
              className="bg-blue-600 flex gap-1 rounded-xl text-base font-semibold"
              size={"sm"}
            >
              Volver a obras
              <CornerUpLeft className=" w-4 h-4" />
            </Button>
          </Link>
          <div className="flex gap-5 items-end">
            <h1 className="text-heading-blue text-4xl font-semibold ">
              {obra?.name}
            </h1>
            <span className="text-heading-blue text-sm font-semibold leading-6">
              {obra?.cliente.client_name}
            </span>
          </div>
        </div>
      </nav>
      <div className="h-[1px] w-full bg-black/60 mb-9" />
      <div className="flex-1 space-y-6">
        {obra ? (
          <>
            <div className=" mb-8">
              <ObraCard data={obra} clients={clients} />
              <div className="flex w-full flex-col justify-between gap-10 bg-white px-7 py-5 rounded-3xl shadow-lg">
                <InfoPresupuestoCard data={obra} clients={clients} />
                <Facturas
                  obraId={params.obraId}
                  initialFacturas={obra.facturas}
                />
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Obra no encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default ObraPage;
