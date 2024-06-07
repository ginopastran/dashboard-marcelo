import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    if (!params.clientId) {
      return new NextResponse("Client id is required", { status: 400 });
    }

    const client = await db.cliente.findUnique({
      where: {
        id: params.clientId,
      },
      include: {
        label: true,
        contacts: true,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENTE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.clientId) {
      return new NextResponse("Client id is required", { status: 400 });
    }

    const client = await db.cliente.delete({
      where: {
        id: params.clientId,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENTE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const session = await auth();

    const body = await req.json();

    console.log(body);

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
      label,
    } = body;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.clientId) {
      return new NextResponse("Client id is required", { status: 400 });
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

    const client = await db.cliente.update({
      where: {
        id: params.clientId,
      },
      data: {
        client_name: clientName,
        industry,
        responsible_name: responsibleName,
        job_title: jobTitle,
        contact,
        DNI: dni,
        email,
        other,
      },
    });

    const clientJson = {
      ...client,
      contact: client.contact.toString(),
      DNI: client.DNI.toString(),
    };

    return NextResponse.json(clientJson);
  } catch (error) {
    console.log("[CLIENTE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
