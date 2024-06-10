import { db } from "@/lib/db";

import { ClientColumn } from "./components/columns";
import { ClientsClient } from "./components/client";
import { Separator } from "@/components/ui/separator";

const ClientsPage = async ({ params }: { params: { id: string } }) => {
  const clients = await db.cliente.findMany({
    where: {
      id: params.id,
    },
    orderBy: {
      client_name: "desc",
    },
  });

  // const formattedClients: ClientColumn[] = clients.map((item) => ({
  //   id: item.id,
  //   client_name: item.client_name,
  //   industry: item.industry,
  //   responsible_name: item.responsible_name,
  //   job_title: item.job_title,
  //   contact: item.contact,
  //   DNI: item.DNI,
  //   email: item.email || "",
  //   other: item.other || "",
  // }));

  return (
    <div className="flex-col px-9">
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
