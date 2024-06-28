import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    const body = await req.json();
    console.log("Request body:", body); // Debugging line

    const {
      clientId,
      contactId,
      name, // Asegurándonos de que 'name' esté incluido
      numeroPresupuesto,
      importe,
      oc,
      url,
      fecha,
      saldo,
      porcentajePendiente,
      state,
    } = body;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!clientId) {
      return new NextResponse("Client ID is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Obtener el último numero_obra y generar el nuevo numero_obra
    const lastObra = await db.obra.findFirst({
      orderBy: { numero_obra: "desc" },
    });
    const nuevoNumeroObra = (lastObra?.numero_obra ?? BigInt(0)) + BigInt(1);

    const obra = await db.obra.create({
      data: {
        clienteId: clientId,
        contactId: contactId || null,
        name: name, // Añadiendo 'name' aquí
        numero_obra: nuevoNumeroObra,
        numero_presupuesto: numeroPresupuesto
          ? BigInt(numeroPresupuesto)
          : null,
        importe: importe ? BigInt(importe) : null,
        oc: oc ? BigInt(oc) : null,
        url: url || "",
        fecha: fecha ? new Date(fecha) : null,
        saldo: saldo ? BigInt(saldo) : null,
        porcentajePendiente: porcentajePendiente || 0,
        state: state || "SinComenzar", // Agregar estado por defecto como "SinComenzar"
      },
      include: {
        cliente: {
          include: {
            contacts: true,
          },
        },
        contact: true,
        seguimientos: true,
        facturas: true,
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
    const obraJson = { ...obra };
    convertBigIntToString(obraJson);

    return NextResponse.json(obraJson);
  } catch (error) {
    console.log("[OBRA_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
