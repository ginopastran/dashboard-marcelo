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

  const formattedCategories: ClientColumn[] = clients.map((item) => ({
    id: item.id,
    name: item.client_name,
  }));

  return (
    <div className="flex-col">
      <nav className=" py-10 px-9 flex justify-between w-full ">
        <h1 className=" text-blue-950 text-4xl font-semibold">
          Gestión de Clientes
        </h1>
      </nav>
      <div className="flex-1 space-y-4 p-8 pt-2">
        <ClientsClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default ClientsPage;
