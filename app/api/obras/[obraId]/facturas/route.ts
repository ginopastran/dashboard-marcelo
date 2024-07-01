import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { obraId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.obraId) {
      return new NextResponse("Obra ID is required", { status: 400 });
    }

    // Obtener el último número de factura y generar el nuevo número de factura
    const lastFactura = await db.facturaObra.findFirst({
      where: { obraId: params.obraId },
      orderBy: { numero_factura: "desc" },
    });

    const nuevoNumeroFactura = (lastFactura?.numero_factura ?? 0) + 1;

    const newFactura = await db.facturaObra.create({
      data: {
        obraId: params.obraId,
        numero_factura: nuevoNumeroFactura,
        // Campos predeterminados
        fecha_factura: null,
        importe: BigInt(0),
        carga_portal: 0,
        recordatorio_cobro: 0,
        observaciones: "",
      },
    });

    const facturaJson = {
      ...newFactura,
      importe: newFactura.importe.toString(),
      nota_credito: newFactura.nota_credito?.toString() || null,
      nota_debito: newFactura.nota_debito?.toString() || null,
    };

    return NextResponse.json(facturaJson);
  } catch (error) {
    console.log("[FACTURA_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
