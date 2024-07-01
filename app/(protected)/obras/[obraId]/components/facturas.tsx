"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FacturaForm } from "./factura-form";
import { FacturaObra } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FacturasProps {
  obraId: string;
  initialFacturas: FacturaObra[];
}

const Facturas: React.FC<FacturasProps> = ({ obraId, initialFacturas }) => {
  const router = useRouter();

  const [facturas, setFacturas] = useState(
    initialFacturas
      .map((factura) => ({
        id: factura.id,
        numero: factura.numero_factura,
        data: factura,
      }))
      .sort((a, b) => a.numero - b.numero)
  );

  const [selectedFactura, setSelectedFactura] = useState<any>(
    facturas[0] || null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (facturas.length > 0 && !selectedFactura) {
      setSelectedFactura(facturas[0]);
    }
  }, [facturas, selectedFactura]);

  const handleAddFactura = async () => {
    try {
      const response = await fetch(`/api/obras/${obraId}/facturas`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create factura");
      }

      const newFactura = await response.json();
      const updatedFacturas = [
        ...facturas,
        {
          id: newFactura.id,
          numero: newFactura.numero_factura,
          data: newFactura,
        },
      ].sort((a, b) => a.numero - b.numero);

      setFacturas(updatedFacturas);
      setSelectedFactura({
        id: newFactura.id,
        numero: newFactura.numero_factura,
        data: newFactura,
      });
      setIsEditing(true);
    } catch (error) {
      console.error("Error adding factura:", error);
    }
  };

  const handleSaveFactura = async (data: any) => {
    if (selectedFactura) {
      try {
        const response = await fetch(
          `/api/obras/${obraId}/facturas/${selectedFactura.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              importe: data.importe ? data.importe.toString() : null,
              nota_credito: data.nota_credito
                ? data.nota_credito.toString()
                : null,
              nota_debito: data.nota_debito
                ? data.nota_debito.toString()
                : null,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update factura");
        }

        const updatedFactura = await response.json();
        const updatedFacturas = facturas.map((factura) =>
          factura.id === selectedFactura.id
            ? { ...factura, data: updatedFactura }
            : factura
        );

        setFacturas(updatedFacturas);
        setSelectedFactura((prev: any) => ({
          ...prev,
          data: updatedFactura,
        }));
        setIsEditing(false);

        toast.success("Factura actualizada.");
        router.refresh();
      } catch (error) {
        console.error("Error updating factura:", error);
        toast.error("Error al actualizar factura.");
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-start w-full gap-10">
      <div className="flex items-center justify-start gap-4 w-full">
        {facturas.map((factura) => (
          <div key={factura.id} className="flex items-center justify-between">
            <Button
              onClick={() => setSelectedFactura(factura)}
              className={`block ${
                selectedFactura?.id === factura.id
                  ? " bg-blue-button text-white hover:bg-blue-button"
                  : " bg-gray-400 text-white hover:bg-blue-button"
              } rounded-xl tracking-wide`}
            >
              Factura N°{factura.numero}
            </Button>
          </div>
        ))}
        <Button
          onClick={handleAddFactura}
          className=" bg-transparent hover:bg-transparent text-heading-blue gap-2 font-semibold"
        >
          <Plus className="w-4 h-4 text-blue-button border-2 border-blue-button rounded-md p-0" />
          Nueva Factura
        </Button>
      </div>
      {selectedFactura && (
        <FacturaForm
          key={selectedFactura.id}
          onSave={handleSaveFactura}
          onCancel={handleCancel}
          initialData={selectedFactura.data}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Facturas;
