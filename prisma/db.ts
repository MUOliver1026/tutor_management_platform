import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// reuse the instance or create a new one and log all queries made to the db
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

// hot reloads
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
