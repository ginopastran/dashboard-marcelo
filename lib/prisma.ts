import { PrismaClient } from "@prisma/client";
import "../middlewares/prismaMiddleware";

const prisma = new PrismaClient();

export default prisma;
