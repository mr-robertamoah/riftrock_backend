import { PrismaClient } from '@prisma/client';
import * as bcryt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL ?? 'mr_robertamoah@yahoo.com',
      password: await bcryt.hash(process.env.ADMIN_PASSWORD ?? 'password', 10),
      firstName: 'Robert',
      lastName: 'Amoah',
      role: 'SUPER_ADMIN',
    },
  });
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
