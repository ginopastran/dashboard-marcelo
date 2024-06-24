import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    const body = await req.json();
    console.log("Request body:", body); // Debugging line

    const { clientId, contactId, name } = body;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!clientId) {
      return new NextResponse("Client ID is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const presupuesto = await db.presupuesto.create({
      data: {
        clienteId: clientId,
        contactId: contactId || null,
        name,
        state: "Oportunidad", // Agregar estado por defecto como "OPORTUNIDAD"
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

    // Función para convertir BigInt a string en un objeto
    const convertBigIntToString = (obj: any) => {
      for (const key in obj) {
        if (typeof obj[key] === "bigint") {
          obj[key] = obj[key].toString();
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          convertBigIntToString(obj[key]);
        }
      }
    };

    // Convertir BigInt a string antes de enviar la respuesta
    const presupuestoJson = { ...presupuesto };
    convertBigIntToString(presupuestoJson);

    return NextResponse.json(presupuestoJson);
  } catch (error) {
    console.log("[PRESUPUESTO_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
