/**
 * FactoryFlow database seed script.
 *
 * STATUS: documented stub — not executed in Phase 1.
 *
 * The app currently runs against typed mock fixtures in
 * `src/lib/mock-data/` (see src/lib/types.ts for the shared interfaces,
 * which mirror the Prisma models in schema.prisma 1:1). When a real
 * Postgres database is connected:
 *
 *   1. Set DATABASE_URL in .env (Neon / Supabase / local Postgres)
 *   2. npx prisma migrate dev --name init
 *   3. npx prisma db seed
 *
 * Each `seed*()` function below maps a mock-data fixture array directly
 * onto a `prisma.<model>.createMany()` call. Because the mock fixtures
 * already match the Prisma model shapes, this is largely a 1:1 transcription
 * — the real swap-over happens in the data-access layer (replacing
 * `src/lib/mock-data` imports with `prisma.<model>.findMany()` calls),
 * not in this file.
 *
 * Seed order matters due to foreign key dependencies:
 *   roles -> factories -> users -> production lines -> machines
 *   -> rack locations -> bin locations -> work orders -> boards
 *   -> wip records -> dmc records -> inspection records
 *   -> rework boards -> xout boards -> production events -> alerts
 *   -> audit logs
 */

// import { PrismaClient } from "../src/generated/prisma";
// import {
//   factories,
//   productionLines,
//   machines,
//   workOrders,
//   boards,
//   alerts,
//   productionEvents,
// } from "../src/lib/mock-data";
//
// const prisma = new PrismaClient();
//
// async function seedRoles() {
//   const roleNames = [
//     "OPERATOR",
//     "SUPERVISOR",
//     "ENGINEER",
//     "QUALITY_ENGINEER",
//     "PLANT_MANAGER",
//     "DIRECTOR",
//     "ADMIN",
//   ] as const;
//
//   await prisma.role.createMany({
//     data: roleNames.map((name) => ({ name })),
//     skipDuplicates: true,
//   });
// }
//
// async function seedFactories() {
//   await prisma.factory.createMany({ data: factories, skipDuplicates: true });
// }
//
// async function seedProductionLines() {
//   await prisma.productionLine.createMany({
//     data: productionLines,
//     skipDuplicates: true,
//   });
// }
//
// async function seedMachines() {
//   await prisma.machine.createMany({ data: machines, skipDuplicates: true });
// }
//
// async function main() {
//   await seedRoles();
//   await seedFactories();
//   await seedProductionLines();
//   await seedMachines();
//   // ...continue for work orders, boards, WIP, DMC records,
//   // inspection records, rework/xout boards, production events, alerts.
// }
//
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

export {};
