"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns, ClientColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ClientForm } from "../[clientId]/components/client-form";

interface ClientsClientProps {
  data: ClientColumn[];
}

export const ClientsClient: React.FC<ClientsClientProps> = ({ data }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log(data);

  return (
    <>
      <div className="flex items-center gap-3">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 flex gap-1 rounded-xl" size={"sm"}>
              <Plus className="h-4 w-4" />
              Añadir Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ClientForm
              initialData={null}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
    </>
  );
};
