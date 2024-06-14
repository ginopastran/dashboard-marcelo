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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContactTableProps<TData extends { [key: string]: any }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function ContactTable<TData extends { [key: string]: any }, TValue>({
  columns,
  data,
  searchKey,
}: ContactTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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

  const inputStyle =
    " bg-transparent border-0 border-b-[1px] border-black/60 rounded-none px-0 focus-visible:ring-0 w-[80%]";

  return (
    <div className="mt-8">
      <div className="rounded-md border-none">
        <Table className="border-none">
          <TableHeader className="border-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-none">
                {headerGroup.headers.map((header) => {
                  return (
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
                  );
                })}
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

      {/* <div className="flex gap-2">
        <Button
          onClick={handleAdd}
          variant="outline"
          className="mb-4 border-blue-button border-2 rounded-xl text-blue-button font-semibold text-base px-6 mt-5 hover:bg-blue-button hover:text-white"
          size={"sm"}
        >
          Añadir contacto
        </Button>
        <Button
          //   onClick={handleAdd}
          size={"sm"}
          className="mb-4 bg-blue-button text-white rounded-xl font-semibold text-base px-6 mt-5"
        >
          Enviar un correo
        </Button>
      </div> */}
    </div>
  );
}
