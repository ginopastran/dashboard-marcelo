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

interface CellActionProps {
  data: ClientColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log(data);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/clients/${data.id}`);
      toast.success("Categoría eliminada.");
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
    toast.success("Category ID copiado.");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Button>
        <FolderSymlink className=" mr-2 h-4 w-4" /> Ver Información
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <SlidersVertical className=" mr-2 h-4 w-4" /> Modificar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ClientForm
            initialData={data}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
