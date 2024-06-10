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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CellAction } from "@/app/(protected)/clients/components/cell-action";
import { Cliente } from "@prisma/client";
import Image from "next/image";

interface DataTableProps<TData extends { [key: string]: any }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Cliente[];
  searchKey: string;
}

export function DataTable<TData extends { [key: string]: any }, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  console.log(data);

  return (
    <div>
      <div className=" mt-12">
        {data.map((item, id) => (
          <div className=" bg-white px-7 py-5 rounded-3xl mb-3 w-full flex shadow-lg justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-5">
                <h2 className=" font-bold text-heading-blue text-lg">
                  {item.client_name}
                </h2>
                <div className="flex bg-label-purple rounded-full items-center gap-1">
                  <div className=" bg-white h-3 w-3 rounded-full items-start ml-1" />
                  <p className=" text-white text-sm mr-1">RTX 2060</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <p className=" font-bold text-heading-blue">Industria:</p>
                  <span className=" text-heading-blue font-medium">
                    {item.industry}
                  </span>
                </div>
                <div className="flex gap-1">
                  <p className=" font-bold text-heading-blue">Ingresó el:</p>
                  <span className=" text-heading-blue font-medium">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <CellAction data={item} />
            </div>
            <div className="flex items-center">
              <Image
                src={"/arquimetal-logo-blue.svg"}
                alt="Arquimetal-Logo-Blue"
                width={50}
                height={50}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button> */}
      </div>
    </div>
  );
}
