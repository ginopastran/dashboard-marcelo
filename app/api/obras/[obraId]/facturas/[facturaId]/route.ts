// pages/api/obras/[obraId]/facturas/[facturaId]/route.ts

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { obraId: string; facturaId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.obraId || !params.facturaId) {
      return new NextResponse("Obra ID and Factura ID are required", {
        status: 400,
      });
    }

    const body = await req.json();

    const dataToUpdate = {
      ...body,
      importe: body.importe ? BigInt(body.importe) : null,
      nota_credito: body.nota_credito ? BigInt(body.nota_credito) : null,
      nota_debito: body.nota_debito ? BigInt(body.nota_debito) : null,
    };

    // Remove fields that are null or undefined
    Object.keys(dataToUpdate).forEach((key) => {
      if (dataToUpdate[key] === null || dataToUpdate[key] === undefined) {
        delete dataToUpdate[key];
      }
    });

    const updatedFactura = await db.facturaObra.update({
      where: { id: params.facturaId },
      data: dataToUpdate,
    });

    const facturaJson = {
      ...updatedFactura,
      importe: updatedFactura.importe?.toString() || null,
      nota_credito: updatedFactura.nota_credito?.toString() || null,
      nota_debito: updatedFactura.nota_debito?.toString() || null,
    };

    return NextResponse.json(facturaJson);
  } catch (error) {
    console.log("[FACTURA_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
