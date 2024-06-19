import { db } from "@/lib/db";

import { ClientsClient } from "./components/client";
import { Separator } from "@/components/ui/separator";

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

  // console.log(clients);

  return (
    <div className="flex-col px-9 bg-secondary-background">
      <nav className=" py-10 flex justify-between w-full pt-20">
        <h1 className=" text-heading-blue text-4xl font-semibold">
          Gestión de Clientes
        </h1>
      </nav>
      {/* <Separator/> */}
      <div className=" h-[1px] w-full bg-black/60 mb-9" />
      <div className="flex-1 space-y-4 py-8 pt-2">
        <ClientsClient data={clients} />
      </div>
    </div>
  );
};

export default ClientsPage;
