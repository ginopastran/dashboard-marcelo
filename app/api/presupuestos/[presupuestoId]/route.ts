import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { presupuestoId: string } }
) {
  try {
    const session = await auth();

    const body = await req.json();
    // console.log("Request body:", body); // Debugging line

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
    } = body;
    const { presupuestoId } = params;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!presupuestoId) {
      return new NextResponse("Presupuesto ID is required", { status: 400 });
    }

    const existingPresupuesto = await db.presupuesto.findUnique({
      where: { id: presupuestoId },
    });

    if (!existingPresupuesto) {
      return new NextResponse("Presupuesto not found", { status: 404 });
    }

    // Update the presupuesto
    const updatedPresupuesto = await db.presupuesto.update({
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

    // Update the contact if contact_contact is provided
    if (contact_contact !== undefined && contactId) {
      await db.contacto.update({
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

    const existingPresupuesto = await db.presupuesto.findUnique({
      where: { id: presupuestoId },
    });

    if (!existingPresupuesto) {
      return new NextResponse("Presupuesto not found", { status: 404 });
    }

    await db.presupuesto.delete({
      where: { id: presupuestoId },
    });

    return new NextResponse("Presupuesto deleted", { status: 200 });
  } catch (error) {
    console.log("[PRESUPUESTO_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
