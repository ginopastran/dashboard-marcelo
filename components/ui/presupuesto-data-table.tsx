import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Cliente, Contacto, Presupuesto } from "@prisma/client";
import Image from "next/image";
import { Collapsible, CollapsibleContent } from "./collapsible";
import BoxArrowIcon from "../icons/box-arrow";
import { Button } from "./button";

interface ClienteConContacto extends Cliente {
  contacts: Contacto[];
}

interface PresupuestoConCliente extends Presupuesto {
  cliente: ClienteConContacto;
  contact?: Contacto | null;
}

interface DataTableProps {
  data: PresupuestoConCliente[];
  columns: ColumnDef<Contacto>[];
}

export function PresupuestoDataTable({ data, columns }: DataTableProps) {
  const [openCollapsibles, setOpenCollapsibles] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingContact, setEditingContact] =
    useState<Partial<Contacto> | null>(null);
  const [selectedClient, setSelectedClient] = useState<Presupuesto | null>(
    null
  );

  const toggleCollapsible = (index: number) => {
    setOpenCollapsibles((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  const formatDNI = (dni: bigint) => {
    const dniStr = dni.toString();
    return dniStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

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
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-heading-blue text-lg">
                      {item.cliente.client_name}
                    </h2>
                    <span className=" text-xs font-bold text-gray-700">
                      N°20
                    </span>
                  </div>
                  <h3 className=" text-heading-blue font-medium">
                    {item.name}
                  </h3>
                  <div className="flex gap-1">
                    <div className="flex bg-label-purple rounded-full items-center gap-1 mr-2">
                      <div className="bg-white h-3 w-3 rounded-full items-start ml-1" />
                      <p className="text-white text-xs mr-1">{item.state}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-1">
                    <p className="font-bold text-heading-blue">Responsable:</p>
                    <span className="text-heading-blue font-medium">
                      {item.contact?.contact_client_name || "Sin contacto"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-bold text-heading-blue">Creado el</p>
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
                          {item.contact?.contact_client_name || "Sin contacto"}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">Cargo:</p>
                        <span className="text-heading-blue font-medium">
                          {item.contact?.contact_job_title || "Sin contacto"}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">DNI:</p>
                        <span className="text-heading-blue font-medium">
                          {item.contact?.contact_DNI
                            ? formatDNI(item.contact.contact_DNI)
                            : "Sin contacto"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-12">
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">Contacto:</p>
                        <span className="text-heading-blue font-medium">
                          {item.contact?.contact_contact
                            ? `+${item.contact.contact_contact.toString()}`
                            : "Sin contacto"}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">Correo:</p>
                        <span className="text-heading-blue font-medium">
                          {item.contact?.contact_email || "Sin contacto"}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <p className="font-bold text-heading-blue">Otros:</p>
                        <span className="text-heading-blue font-medium">
                          {item.contact?.contact_other || "Sin contacto"}
                        </span>
                      </div>
                    </div>
                    <div className=" mt-10">
                      <h2 className="font-semibold text-heading-blue text-lg">
                        OTROS CONTACTOS
                      </h2>
                      <div className=" h-[1px] w-full bg-black/60 mt-6" />
                      <div className="flex flex-col gap-3">
                        {item.cliente.contacts.map((contact) => (
                          <div key={contact.id} className="flex gap-4">
                            <div className="flex gap-1">
                              <p className="font-bold text-heading-blue">
                                Nombre:
                              </p>
                              <span className="text-heading-blue font-medium">
                                {contact.contact_client_name}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <p className="font-bold text-heading-blue">
                                Cargo:
                              </p>
                              <span className="text-heading-blue font-medium">
                                {contact.contact_job_title}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <p className="font-bold text-heading-blue">
                                DNI:
                              </p>
                              <span className="text-heading-blue font-medium">
                                {formatDNI(contact.contact_DNI)}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <p className="font-bold text-heading-blue">
                                Contacto:
                              </p>
                              <span className="text-heading-blue font-medium">
                                +{contact.contact_contact.toString()}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <p className="font-bold text-heading-blue">
                                Correo:
                              </p>
                              <span className="text-heading-blue font-medium">
                                {contact.contact_email}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start space-x-2 py-4">
                    <Button
                      onClick={() => {
                        setIsAdding(true);
                        setEditingContact(null);
                        setSelectedClient(item);
                      }}
                      variant="outline"
                      className="mb-4 border-blue-button border-2 rounded-xl text-blue-button font-semibold text-base px-6 mt-5 hover:bg-blue-button hover:text-white"
                      size={"sm"}
                    >
                      Añadir contacto
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
}
