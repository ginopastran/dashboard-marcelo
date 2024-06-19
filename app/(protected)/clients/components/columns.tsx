import { ColumnDef } from "@tanstack/react-table";
import { Contacto } from "@prisma/client";

export const columns: ColumnDef<Contacto>[] = [
  {
    accessorKey: "contact_client_name",
    header: "Nombre del Contacto",
  },
  {
    accessorKey: "contact_job_title",
    header: "Cargo",
  },
  {
    accessorKey: "contact_DNI",
    header: "DNI",
  },
  {
    accessorKey: "contact_contact",
    header: "Contacto",
  },
  {
    accessorKey: "contact_email",
    header: "Email",
  },
  {
    accessorKey: "contact_other",
    header: "Otros",
  },
];
