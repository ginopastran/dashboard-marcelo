"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Cliente, Contacto, EtiquetaCiente } from "@prisma/client";
import Image from "next/image";
import { Collapsible, CollapsibleContent } from "./collapsible";
import BoxArrowIcon from "../icons/box-arrow";
import axios from "axios";
import toast from "react-hot-toast";
import { CellAction } from "@/app/(protected)/clients/components/cell-action";
import { Button } from "./button";
import { ContactForm } from "@/app/(protected)/clients/[clientId]/components/contact-form";
import { ContactTable } from "./contact-table";

interface ClienteConEtiquetas extends Cliente {
  label: EtiquetaCiente[];
  contacts: Contacto[];
}

interface DataTableProps {
  data: ClienteConEtiquetas[];
  columns: ColumnDef<Contacto>[];
}

export function DataTable({ data, columns }: DataTableProps) {
  const [openCollapsibles, setOpenCollapsibles] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingContact, setEditingContact] =
    useState<Partial<Contacto> | null>(null);
  const [selectedClient, setSelectedClient] =
    useState<ClienteConEtiquetas | null>(null);

  const toggleCollapsible = (index: number) => {
    setOpenCollapsibles((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleSaveContact = async (newContact: Partial<Contacto>) => {
    if (!selectedClient) return;

    try {
      const contactToSave = {
        contact_client_name: newContact.contact_client_name || "",
        contact_job_title: newContact.contact_job_title || "",
        contact_DNI: newContact.contact_DNI
          ? newContact.contact_DNI.toString()
          : "0",
        contact_contact: newContact.contact_contact
          ? newContact.contact_contact.toString()
          : "0",
        contact_email: newContact.contact_email || "",
        contact_other: newContact.contact_other || "",
      };

      if (editingContact && editingContact.id) {
        await axios.patch(
          `/api/clients/${selectedClient.id}/contacts/${editingContact.id}`,
          contactToSave
        );
        toast.success("Contacto actualizado exitosamente.");
      } else {
        await axios.post(
          `/api/clients/${selectedClient.id}/contacts`,
          contactToSave
        );
        toast.success("Contacto guardado exitosamente.");
      }

      // Refrescar los datos o hacer cualquier lógica adicional que necesites
      setIsAdding(false);
      setEditingContact(null);
      setSelectedClient(null);
    } catch (error) {
      toast.error("Error al guardar el contacto.");
      console.log(error);
    }
  };

  const handleEditContact = (
    contact: Contacto,
    client: ClienteConEtiquetas
  ) => {
    setEditingContact(contact);
    setSelectedClient(client);
    setIsAdding(true);
  };

  const handleDeleteContact = async (
    contact: Contacto,
    client: ClienteConEtiquetas
  ) => {
    try {
      await axios.delete(`/api/clients/${client.id}/contacts/${contact.id}`);
      toast.success("Contacto eliminado exitosamente.");
      // Refrescar los datos o hacer cualquier lógica adicional que necesites
    } catch (error) {
      toast.error("Error al eliminar el contacto.");
      console.log(error);
    }
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
                    <div className=" h-[1px] w-full bg-black/60 mt-6" />
                    <div>
                      <ContactTable
                        columns={columns}
                        data={item.contacts}
                        onEdit={(contact) => handleEditContact(contact, item)}
                        onDelete={(contact) =>
                          handleDeleteContact(contact, item)
                        }
                      />
                    </div>
                  </div>
                  {isAdding && (
                    <ContactForm
                      onSave={handleSaveContact}
                      onCancel={() => {
                        setIsAdding(false);
                        setEditingContact(null);
                      }}
                      initialData={editingContact}
                    />
                  )}
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
