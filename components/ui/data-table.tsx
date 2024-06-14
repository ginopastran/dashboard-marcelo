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
import { Cliente, EtiquetaCiente } from "@prisma/client";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import BoxArrowIcon from "../icons/box-arrow";

interface ClienteConEtiquetas extends Cliente {
  label: EtiquetaCiente[];
}

interface DataTableProps<TData extends { [key: string]: any }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: ClienteConEtiquetas[];
  searchKey: string;
}

export function DataTable<TData extends { [key: string]: any }, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Estado para mantener el estado de apertura/cierre de cada Collapsible
  const [openCollapsibles, setOpenCollapsibles] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  // Función para abrir/cerrar un Collapsible específico
  const toggleCollapsible = (index: number) => {
    setOpenCollapsibles((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  // console.log(data);

  function formatDNI(dni: BigInt) {
    const dniStr = dni.toString(); // Convertir a cadena de texto
    return dniStr.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Aplicar formato con puntos
  }

  return (
    <div>
      <div className="mt-12">
        {data.map((item, id) => (
          <div
            key={id}
            className="bg-white px-7 py-5 rounded-3xl mb-3 w-full flex shadow-lg justify-between flex-col"
          >
            <div className=" flex w-full justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-5">
                  <h2 className="font-bold text-heading-blue text-lg">
                    {item.client_name}
                  </h2>
                  <div className="flex gap-1">
                    {item.label.map((label: EtiquetaCiente) => (
                      <div
                        key={label.id}
                        className="flex bg-label-purple rounded-full items-center gap-1 mr-2"
                      >
                        <div className="bg-white h-3 w-3 rounded-full items-start ml-1" />
                        <p className="text-white text-sm mr-1">{label.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-1">
                    <p className="font-bold text-heading-blue">Industria:</p>
                    <span className="text-heading-blue font-medium">
                      {item.industry}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-bold text-heading-blue">Ingresó el</p>
                    <span className="text-heading-blue font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <button
                  className=" text-heading-blue flex items-center text-lg font-semibold"
                  onClick={() => toggleCollapsible(id)}
                >
                  <BoxArrowIcon className=" mr-2" /> Ver Información
                </button>
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
            <Collapsible open={openCollapsibles[id]}>
              <CollapsibleContent>
                <div className=" mt-6">
                  <div className="flex flex-col w-full gap-6">
                    <div className="flex gap-12">
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">
                          Responsable:
                        </p>
                        <span className="text-heading-blue font-medium">
                          {item.responsible_name}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">Cargo:</p>
                        <span className="text-heading-blue font-medium">
                          {item.job_title}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">DNI:</p>
                        <span className="text-heading-blue font-medium">
                          {formatDNI(item.DNI)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-12">
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">Contacto:</p>
                        <span className="text-heading-blue font-medium">
                          +{item.contact.toString()}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">Correo:</p>
                        <span className="text-heading-blue font-medium">
                          {item.email}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">Otros:</p>
                        <span className="text-heading-blue font-medium">
                          {item.other}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className=" mt-10">
                    <h2 className="font-semibold text-heading-blue text-lg">
                      OTROS CONTACTOS
                    </h2>
                    <div className=" h-[1px] w-full bg-black/60 my-3" />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* Pagination buttons can be added here */}
      </div>
    </div>
  );
}
