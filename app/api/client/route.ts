import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    const body = await req.json();

    const {
      id,
      client_name,
      industry,
      responsible_name,
      job_title,
      contact,
      DNI,
      email,
      other,
      label,
    } = body;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!client_name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!industry) {
      return new NextResponse("Industry is required", { status: 400 });
    }

    if (!responsible_name) {
      return new NextResponse("Responsible name is required", { status: 400 });
    }

    if (!job_title) {
      return new NextResponse("Job title is required", { status: 400 });
    }

    if (!contact) {
      return new NextResponse("Contact is required", { status: 400 });
    }

    if (!DNI) {
      return new NextResponse("DNI is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const labels = await Promise.all(
      label.map(async (name: any) => {
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

    const client = await db.cliente.create({
      data: {
        id,
        client_name,
        industry,
        responsible_name,
        job_title,
        contact,
        DNI,
        email,
        other,
        label: {
          connect: labels.map((label) => ({ id: label.id })),
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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clientName = searchParams.get("clientName") || undefined;
    const industry = searchParams.get("industry") || undefined;

    const clients = await db.cliente.findMany({
      where: {
        client_name: clientName,
        industry: industry,
      },
      include: {
        label: true,
      },
      orderBy: {
        client_name: "asc",
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.log("[CLIENTE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
