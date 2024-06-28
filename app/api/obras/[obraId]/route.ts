import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Importa la instancia de Prisma con el middleware
import { auth } from "@/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { obraId: string } }
) {
  try {
    const session = await auth();

    const body = await req.json();

    const {
      name,
      numero_obra,
      numero_presupuesto,
      importe,
      oc,
      url,
      fecha,
      saldo,
      porcentajePendiente,
      state, // Include state in the destructuring if it's part of Obra
    } = body;
    const { obraId } = params;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!obraId) {
      return new NextResponse("Obra ID is required", { status: 400 });
    }

    const existingObra = await prisma.obra.findUnique({
      where: { id: obraId },
    });

    if (!existingObra) {
      return new NextResponse("Obra not found", { status: 404 });
    }

    // Update the obra
    const updatedObra = await prisma.obra.update({
      where: { id: obraId },
      data: {
        name: name,
        numero_obra:
          numero_obra !== undefined
            ? BigInt(numero_obra)
            : existingObra.numero_obra,
        numero_presupuesto:
          numero_presupuesto !== undefined
            ? BigInt(numero_presupuesto)
            : existingObra.numero_presupuesto,
        importe: importe !== undefined ? BigInt(importe) : existingObra.importe,
        oc: oc !== undefined ? BigInt(oc) : existingObra.oc,
        url: url || existingObra.url,
        fecha: fecha !== undefined ? new Date(fecha) : existingObra.fecha,
        saldo: saldo !== undefined ? BigInt(saldo) : existingObra.saldo,
        porcentajePendiente:
          porcentajePendiente !== undefined
            ? Number(porcentajePendiente)
            : existingObra.porcentajePendiente,
        state: state || existingObra.state, // Add state update if it's part of Obra
      },
      include: {
        cliente: {
          include: {
            contacts: true,
          },
        },
        contact: true,
        seguimientos: true,
      },
    });

    // Function to convert BigInt to string in an object
    const convertBigIntToString = (obj: any) => {
      for (const key in obj) {
        if (typeof obj[key] === "bigint") {
          obj[key] = obj[key].toString();
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          convertBigIntToString(obj[key]);
        }
      }
    };

    // Convert BigInt to string before sending the response
    const obraJson = { ...updatedObra };
    convertBigIntToString(obraJson);

    return NextResponse.json(obraJson);
  } catch (error) {
    console.log("[OBRA_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { obraId: string } }
) {
  try {
    const session = await auth();
    const { obraId } = params;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!obraId) {
      return new NextResponse("Obra ID is required", { status: 400 });
    }

    const existingObra = await prisma.obra.findUnique({
      where: { id: obraId },
    });

    if (!existingObra) {
      return new NextResponse("Obra not found", { status: 404 });
    }

    await prisma.obra.delete({
      where: { id: obraId },
    });

    return new NextResponse("Obra deleted", { status: 200 });
  } catch (error) {
    console.log("[OBRA_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
