import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import NewClient from "../_components/form/new-client";

const page = () => {
  return (
    <div className="h-full flex flex-col">
      <nav className=" py-12 px-9 flex justify-between w-full ">
        <h1 className=" text-blue-950 text-4xl font-semibold">
          Gestión de clientes
        </h1>
      </nav>
      <main className=" py-8 px-9">
        <Dialog>
          <DialogTrigger asChild>
            <Button className=" bg-blue-600 flex gap-1 rounded-xl" size={"sm"}>
              <Plus className=" h-4 w-4" />
              Añadir Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <NewClient />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default page;
