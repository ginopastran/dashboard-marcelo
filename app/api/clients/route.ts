import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    const body = await req.json();
    console.log("Request body:", body); // Debugging line

    const {
      id,
      clientName,
      industry,
      responsibleName,
      jobTitle,
      contact,
      dni,
      email,
      other,
      labels,
    } = body;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!clientName) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!industry) {
      return new NextResponse("Industry is required", { status: 400 });
    }
    if (!responsibleName) {
      return new NextResponse("Responsible name is required", { status: 400 });
    }
    if (!jobTitle) {
      return new NextResponse("Job title is required", { status: 400 });
    }
    if (!contact) {
      return new NextResponse("Contact is required", { status: 400 });
    }
    if (!dni) {
      return new NextResponse("DNI is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    let labelRecords = [];
    if (labels) {
      labelRecords = await Promise.all(
        labels.map(async (name: string) => {
          const existingLabel = await db.etiquetaCiente.findFirst({
            where: { name },
          });
          return db.etiquetaCiente.upsert({
            where: { id: existingLabel?.id || "" },
            update: {},
            create: { name },
          });
        })
      );
    }

    const client = await db.cliente.create({
      data: {
        id,
        client_name: clientName,
        industry,
        responsible_name: responsibleName,
        job_title: jobTitle,
        contact,
        DNI: dni,
        email,
        other,
        label: {
          connect: labelRecords.map((label) => ({ id: label.id })),
        },
      },
      include: {
        label: true,
      },
    });

    const clientJson = {
      ...client,
      contact: client.contact.toString(),
      DNI: client.DNI.toString(),
    };

    return NextResponse.json(clientJson);
  } catch (error) {
    console.log("[CLIENTE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
