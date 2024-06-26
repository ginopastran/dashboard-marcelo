import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  contact_client_name: z.string().optional(),
  contact_job_title: z.string().optional(),
  contact_DNI: z
    .union([
      z.string().regex(/^\d+$/, "Contact DNI must be a number"),
      z.literal(""),
    ])
    .optional(),
  contact_contact: z
    .union([
      z.string().regex(/^\d+$/, "Contact phone number must be a number"),
      z.literal(""),
    ])
    .optional(),
  contact_email: z
    .string()
    .email("Invalid email address")
    .optional()
    .nullable(),
  contact_other: z.string().optional().nullable(),
});

export async function GET(
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

    const contact = await db.contacto.findUnique({
      where: {
        id: params.contactId,
      },
    });

    if (!contact) {
      return new NextResponse("Contact not found", { status: 404 });
    }

    const contactJson = {
      ...contact,
      contact_DNI: contact.contact_DNI?.toString(),
      contact_contact: contact.contact_contact?.toString(),
    };

    return NextResponse.json(contactJson);
  } catch (error) {
    console.error("[CONTACTO_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { contactId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();

    console.log("DATA QUE LLEGA: ", body);

    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.contactId) {
      return new NextResponse("Contact id is required", { status: 400 });
    }

    const parsedBody = contactSchema.safeParse(body);
    if (!parsedBody.success) {
      console.log("Validation Error: ", parsedBody.error);
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

    const updateData: any = {};

    if (contact_client_name !== undefined && contact_client_name !== "") {
      updateData.contact_client_name = contact_client_name;
    }
    if (contact_job_title !== undefined && contact_job_title !== "") {
      updateData.contact_job_title = contact_job_title;
    }
    if (contact_DNI !== undefined && contact_DNI !== "") {
      updateData.contact_DNI = BigInt(contact_DNI);
    }
    if (contact_contact !== undefined && contact_contact !== "") {
      updateData.contact_contact = BigInt(contact_contact);
    }
    if (contact_email !== undefined) {
      updateData.contact_email = contact_email || null;
    }
    if (contact_other !== undefined) {
      updateData.contact_other = contact_other || null;
    }

    console.log("Updated Data: ", updateData);

    const updatedContact = await db.contacto.update({
      where: {
        id: params.contactId,
      },
      data: updateData,
    });

    const contactJson = {
      ...updatedContact,
      contact_DNI: updatedContact.contact_DNI?.toString(),
      contact_contact: updatedContact.contact_contact?.toString(),
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
