import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const session = await auth();

    const body = await req.json();

    const {
      contact_client_name,
      contact_job_title,
      contact_DNI,
      contact_contact,
      contact_email,
      contact_other,
    } = body;

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.clientId) {
      return new NextResponse("Client id is required", { status: 400 });
    }

    if (!contact_client_name) {
      return new NextResponse("Contact name is required", { status: 400 });
    }

    if (!contact_job_title) {
      return new NextResponse("Contact job title is required", { status: 400 });
    }

    if (!contact_DNI) {
      return new NextResponse("Contact DNI is required", { status: 400 });
    }

    if (!contact_contact) {
      return new NextResponse("Contact phone number is required", {
        status: 400,
      });
    }

    const newContact = await db.contacto.create({
      data: {
        contact_client_name,
        contact_job_title,
        contact_DNI: BigInt(contact_DNI),
        contact_contact: BigInt(contact_contact),
        contact_email,
        contact_other,
        cliente: {
          connect: {
            id: params.clientId,
          },
        },
      },
    });

    const contactJson = {
      ...newContact,
      contact_DNI: newContact.contact_DNI.toString(),
      contact_contact: newContact.contact_contact.toString(),
    };

    return NextResponse.json(contactJson);
  } catch (error) {
    console.log("[CONTACTO_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
