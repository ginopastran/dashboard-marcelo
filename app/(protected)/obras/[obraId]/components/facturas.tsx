"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FacturaForm } from "./factura-form"; // Importa el formulario de factura
import { v4 as uuidv4 } from "uuid";

const Facturas = () => {
  const [facturas, setFacturas] = useState<
    { id: string; numero: number; data?: any }[]
  >([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editFactura, setEditFactura] = useState<any>(null);

  const handleAddFactura = () => {
    const newFactura = {
      id: uuidv4(),
      numero: facturas.length + 1,
      data: {
        numero_factura: facturas.length + 1,
      },
    };
    setFacturas((prev) => [...prev, newFactura]);
    setEditFactura(newFactura);
    setShowForm(true);
  };

  const handleSaveFactura = (data: any) => {
    if (editFactura) {
      setFacturas((prev) =>
        prev.map((factura) =>
          factura.id === editFactura.id ? { ...factura, data } : factura
        )
      );
    }
    setShowForm(false);
    setEditFactura(null);
  };

  const handleEditFactura = (id: string) => {
    const factura = facturas.find((factura) => factura.id === id);
    setEditFactura(factura);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditFactura(null);
  };

  return (
    <div>
      <Button onClick={handleAddFactura}>
        <Plus className="w-4 h-4" />
        Añadir Factura
      </Button>
      <div className="mt-4 space-y-2">
        {facturas.map((factura) => (
          <Button
            key={factura.id}
            onClick={() => handleEditFactura(factura.id)}
            className="block"
          >
            Factura N°{factura.numero}
          </Button>
        ))}
      </div>
      {showForm && editFactura && (
        <FacturaForm
          onSave={handleSaveFactura}
          onCancel={handleCancel}
          initialData={editFactura.data}
        />
      )}
    </div>
  );
};

export default Facturas;
