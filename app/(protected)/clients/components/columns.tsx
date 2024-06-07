"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ClientColumn = {
  id: string;
  client_name: string;
  industry: string;
  responsible_name: string;
  job_title: string;
  contact: bigint;
  DNI: bigint;
  email: string;
  other: string;
};

export const columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: "client_name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
