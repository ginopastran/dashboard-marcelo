import { db } from "@/lib/db";

import { ClientColumn } from "./components/columns";
import { ClientsClient } from "./components/client";

const ClientsPage = async ({ params }: { params: { id: string } }) => {
  const clients = await db.cliente.findMany({
    where: {
      id: params.id,
    },
    orderBy: {
      client_name: "desc",
    },
  });

  const formattedClients: ClientColumn[] = clients.map((item) => ({
    id: item.id,
    client_name: item.client_name,
    industry: item.industry,
    responsible_name: item.responsible_name,
    job_title: item.job_title,
    contact: item.contact,
    DNI: item.DNI,
    email: item.email || "",
    other: item.other || "",
  }));

  return (
    <div className="flex-col">
      <nav className=" py-10 px-9 flex justify-between w-full ">
        <h1 className=" text-blue-950 text-4xl font-semibold">
          Gestión de Clientes
        </h1>
      </nav>
      <div className="flex-1 space-y-4 p-8 pt-2">
        <ClientsClient data={formattedClients} />
      </div>
    </div>
  );
};

export default ClientsPage;
