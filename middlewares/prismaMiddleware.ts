import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "Presupuesto" && params.action === "update") {
    const presupuesto = await prisma.presupuesto.findUnique({
      where: { id: params.args.where.id },
    });

    if (
      presupuesto &&
      params.args.data.state === "Adjudicado" &&
      presupuesto.state !== "Adjudicado"
    ) {
      await prisma.obra.create({
        data: {
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
  }

  return next(params);
});

async function generateObraNumber(): Promise<bigint> {
  const lastObra = await prisma.obra.findFirst({
    orderBy: { numero_obra: "desc" },
  });
  return (lastObra?.numero_obra ?? BigInt(0)) + BigInt(1);
}

export default prisma;
