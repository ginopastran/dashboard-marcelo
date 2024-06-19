import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  contact_client_name: z.string().min(1, "Contact name is required"),
  contact_job_title: z.string().min(1, "Contact job title is required"),
  contact_DNI: z.string().regex(/^\d+$/, "Contact DNI must be a number"),
  contact_contact: z
    .string()
    .regex(/^\d+$/, "Contact phone number must be a number"),
  contact_email: z.string().email("Invalid email address").optional(),
  contact_other: z.string().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { contactId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.contactId) {
      return new NextResponse("Contact id is required", { status: 400 });
    }

    const parsedBody = contactSchema.safeParse(body);
    if (!parsedBody.success) {
      return new NextResponse(parsedBody.error.message, { status: 400 });
    }

    const {
      contact_client_name,
      contact_job_title,
      contact_DNI,
      contact_contact,
      contact_email,
      contact_other,
    } = parsedBody.data;

    const updatedContact = await db.contacto.update({
      where: {
        id: params.contactId,
      },
      data: {
        contact_client_name,
        contact_job_title,
        contact_DNI: BigInt(contact_DNI),
        contact_contact: BigInt(contact_contact),
        contact_email,
        contact_other,
      },
    });

    const contactJson = {
      ...updatedContact,
      contact_DNI: updatedContact.contact_DNI.toString(),
      contact_contact: updatedContact.contact_contact.toString(),
    };

    return NextResponse.json(contactJson);
  } catch (error) {
    console.error("[CONTACTO_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { contactId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.contactId) {
      return new NextResponse("Contact id is required", { status: 400 });
    }

    await db.contacto.delete({
      where: {
        id: params.contactId,
      },
    });

    return new NextResponse("Contact deleted successfully", { status: 200 });
  } catch (error) {
    console.error("[CONTACTO_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
