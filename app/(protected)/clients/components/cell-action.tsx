"use client";

import axios from "axios";
import { useState } from "react";
import {
  Copy,
  Edit,
  FolderSymlink,
  MoreHorizontal,
  SlidersVertical,
  Trash,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClientModal } from "@/hooks/use-category-modal";

import { ClientColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ClientForm } from "../[clientId]/components/client-form";
import { Cliente, EtiquetaCiente } from "@prisma/client";
import SetttingsIcon from "@/components/icons/settings";
import BoxArrowIcon from "@/components/icons/box-arrow";

interface ClienteConEtiquetas extends Cliente {
  label: EtiquetaCiente[];
}

interface CellActionProps {
  data: ClienteConEtiquetas;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // console.log(data);

  const onConfirm = async () => {
    console.log(data.id);

    try {
      setLoading(true);
      await axios.delete(`/api/clients/${data.id}`);
      toast.success("Cliente eliminado.");
      router.refresh();
    } catch (error) {
      toast.error(
        "Asegúrese de eliminar primero todos los presupuestos y obras de este cliente."
      );
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Cliente ID copiado.");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      {/* <Button className=" bg-transparent text-heading-blue">
        <FolderSymlink className=" mr-2 h-4 w-4" /> Ver Información
      </Button> */}
      <div className="flex gap-12 items-end">
        {/* <button className=" text-heading-blue flex items-center text-lg font-semibold">
          <BoxArrowIcon className=" mr-2" /> Ver Información
        </button> */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            {/* <Button>
              <SlidersVertical className=" mr-2 h-4 w-4" /> Modificar
            </Button> */}
            <button className=" text-heading-blue flex items-center text-lg font-semibold">
              <SetttingsIcon className=" mr-2" /> Modificar
            </button>
          </DialogTrigger>
          <DialogContent className=" max-w-6xl p-0 border-0 gap-0 rounded-3xl min-h-[85vh]">
            <ClientForm
              initialData={data}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
