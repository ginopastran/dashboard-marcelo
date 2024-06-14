"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ContactColumn = {
  id: string;
  contact_client_name: string;
  contact_industry: string;
  contact_responsible_name: string;
  contact_job_title: string;
  contact_contact: bigint;
  contact_DNI: bigint;
  contact_email: string;
  contact_other: string;
};

export const columns: ColumnDef<ContactColumn>[] = [
  {
    accessorKey: "contact_client_name",
    header: "Nombre",
  },
  {
    accessorKey: "contact_job_title",
    header: "Cargo",
  },
  {
    accessorKey: "contact_DNI",
    header: "D.N.I.",
  },

  {
    accessorKey: "contact_contact",
    header: "Contacto",
  },
  {
    accessorKey: "contact_email",
    header: "Correo",
  },
  {
    accessorKey: "contact_other",
    header: "Otros",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
