import { PrismaClient } from "@prisma/client";
import toast from "react-hot-toast";

const prisma = new PrismaClient();

prisma.$extends({
  query: {
    presupuesto: {
      async update({ args, query }) {
        const { where, data } = args;

        const presupuesto = await prisma.presupuesto.findUnique({
          where: { id: where.id },
        });

        const result = await query(args);

        if (
          presupuesto &&
          data.state === "Adjudicado" &&
          presupuesto.state !== "Adjudicado"
        ) {
          await prisma.obra.create({
            data: {
              name: `${presupuesto.name}`, // Assuming a name format based on the presupuesto name
              numero_obra: await generateObraNumber(),
              numero_presupuesto: presupuesto.numero_presupuesto ?? undefined,
              importe: presupuesto.importe ?? BigInt(0),
              oc: BigInt(0), // Set initial value for oc
              url: "",
              fecha: new Date(),
              saldo: presupuesto.importe ?? BigInt(0),
              porcentajePendiente: 100,
              clienteId: presupuesto.clienteId,
              contactId: presupuesto.contactId,
              state: "SinComenzar",
            },
          });
        }

        return result;
      },
    },
  },
});

async function generateObraNumber(): Promise<bigint> {
  const lastObra = await prisma.obra.findFirst({
    orderBy: { numero_obra: "desc" },
  });
  return (lastObra?.numero_obra ?? BigInt(0)) + BigInt(1);
}

export default prisma;
