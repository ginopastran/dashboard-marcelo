import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Importa la instancia de Prisma con el middleware
import { auth } from "@/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { presupuestoId: string } }
) {
  try {
    const session = await auth();

    const body = await req.json();

    const {
      clientId,
      contactId,
      name,
      recepcion,
      via_recepcion,
      detalle,
      licitacion,
      locacion,
      sector,
      contact_contact,
      relevado,
      respuesta_presupuesto,
      revision,
      importe,
      numero_presupuesto,
      via_envio,
      state, // Include state in the destructuring
    } = body;
    const { presupuestoId } = params;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!presupuestoId) {
      return new NextResponse("Presupuesto ID is required", { status: 400 });
    }

    const existingPresupuesto = await prisma.presupuesto.findUnique({
      where: { id: presupuestoId },
    });

    if (!existingPresupuesto) {
      return new NextResponse("Presupuesto not found", { status: 404 });
    }

    // Update the presupuesto
    const updatedPresupuesto = await prisma.presupuesto.update({
      where: { id: presupuestoId },
      data: {
        clienteId: clientId || existingPresupuesto.clienteId,
        contactId:
          contactId !== undefined ? contactId : existingPresupuesto.contactId,
        name: name || existingPresupuesto.name,
        recepcion:
          recepcion !== undefined ? recepcion : existingPresupuesto.recepcion,
        via_recepcion: via_recepcion || existingPresupuesto.via_recepcion,
        detalle: detalle || existingPresupuesto.detalle,
        licitacion:
          licitacion !== undefined
            ? licitacion
            : existingPresupuesto.licitacion,
        locacion: locacion || existingPresupuesto.locacion,
        sector: sector || existingPresupuesto.sector,
        relevado: relevado || existingPresupuesto.relevado,
        respuesta_presupuesto:
          respuesta_presupuesto || existingPresupuesto.respuesta_presupuesto,
        revision: revision || existingPresupuesto.revision,
        importe:
          importe !== undefined ? BigInt(importe) : existingPresupuesto.importe,
        numero_presupuesto:
          numero_presupuesto !== undefined
            ? BigInt(numero_presupuesto)
            : existingPresupuesto.numero_presupuesto,
        via_envio: via_envio || existingPresupuesto.via_envio,
        state: state || existingPresupuesto.state, // Add state update
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

    // Create obra if state is "Adjudicado" and was not previously "Adjudicado"
    if (state === "Adjudicado" && existingPresupuesto.state !== "Adjudicado") {
      await prisma.obra.create({
        data: {
          name: `${existingPresupuesto.name}`, // Assuming a name format based on the presupuesto name
          numero_obra: await generateObraNumber(),
          numero_presupuesto:
            existingPresupuesto.numero_presupuesto ?? undefined,
          importe: existingPresupuesto.importe ?? BigInt(0),
          oc: BigInt(0), // Set initial value for oc
          url: "",
          fecha: new Date(),
          saldo: existingPresupuesto.importe ?? BigInt(0),
          porcentajePendiente: 100,
          clienteId: existingPresupuesto.clienteId,
          contactId: existingPresupuesto.contactId,
          state: "SinComenzar",
        },
      });
    }

    // Update the contact if contact_contact is provided
    if (contact_contact !== undefined && contactId) {
      await prisma.contacto.update({
        where: { id: contactId },
        data: { contact_contact: BigInt(contact_contact) },
      });
    }

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
    const presupuestoJson = { ...updatedPresupuesto };
    convertBigIntToString(presupuestoJson);

    return NextResponse.json(presupuestoJson);
  } catch (error) {
    console.log("[PRESUPUESTO_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

async function generateObraNumber(): Promise<bigint> {
  const lastObra = await prisma.obra.findFirst({
    orderBy: { numero_obra: "desc" },
  });
  return (lastObra?.numero_obra ?? BigInt(0)) + BigInt(1);
}

export async function DELETE(
  req: Request,
  { params }: { params: { presupuestoId: string } }
) {
  try {
    const session = await auth();
    const { presupuestoId } = params;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!presupuestoId) {
      return new NextResponse("Presupuesto ID is required", { status: 400 });
    }

    const existingPresupuesto = await prisma.presupuesto.findUnique({
      where: { id: presupuestoId },
    });

    if (!existingPresupuesto) {
      return new NextResponse("Presupuesto not found", { status: 404 });
    }

    await prisma.presupuesto.delete({
      where: { id: presupuestoId },
    });

    return new NextResponse("Presupuesto deleted", { status: 200 });
  } catch (error) {
    console.log("[PRESUPUESTO_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
