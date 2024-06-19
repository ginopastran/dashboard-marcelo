"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Edit, X } from "lucide-react";
import { AlertModal } from "../modals/alert-modal";

interface ContactTableProps<TData extends { [key: string]: any }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onEdit: (contact: TData) => void;
  onDelete: (contact: TData) => void;
}

export function ContactTable<TData extends { [key: string]: any }, TValue>({
  columns,
  data,
  onEdit,
  onDelete,
}: ContactTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const handleDeleteClick = (contact: TData) => {
    setContactToDelete(contact);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (contactToDelete) {
      setLoading(true);
      await onDelete(contactToDelete);
      setLoading(false);
      setIsModalOpen(false);
      setContactToDelete(null);
    }
  };

  return (
    <div className="mt-8">
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />
      <div className="rounded-md border-none">
        <Table className="border-none">
          <TableHeader className="border-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-none">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-heading-blue font-bold text-base border-none"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className=" border-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-slate-700 border-none"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      <div className="h-[1px] w-[80%] bg-black/60 mt-2" />
                    </TableCell>
                  ))}
                  <TableCell className="text-slate-700 border-none flex gap-2">
                    <button onClick={() => onEdit(row.original)} className="">
                      <Edit className=" text-black" />
                    </button>
                    <button onClick={() => handleDeleteClick(row.original)}>
                      <X className=" text-black" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className=" border-none">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
