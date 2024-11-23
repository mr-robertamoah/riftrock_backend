import { PrismaClient } from '@prisma/client';
import * as bcryt from 'bcrypt';

const prisma = new PrismaClient();

const services = [
  {
    icon: 'HardHat',
    title: 'General Mining Consumables',
    description:
      'Equip your team with essential mining consumables including PPE, hand tools, first aid kits, water, and more for enhanced safety and efficiency.',
  },
  {
    icon: 'Truck',
    title: 'Civil & Earth works',
    description:
      'At RiftRock Mining Services, we make moving of materials easier and less costly.',
  },
  {
    icon: 'Wrench',
    title: 'Mining Ancilliary Services',
    description:
      'Access specialized equipment rentals like HME, graders, and dozers to meet your unique project requirements and ensure operational success.',
  },
  {
    icon: 'Bus',
    title: 'Reliable Human Transportation',
    description:
      'Ensure smooth and efficient transportation for your staff with our reliable services, providing the right buses to meet your logistical needs.',
  },
];

async function main() {
  const user = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL ?? 'mr_robertamoah@yahoo.com',
      password: await bcryt.hash(process.env.ADMIN_PASSWORD ?? 'password', 10),
      firstName: 'Robert',
      lastName: 'Amoah',
      role: 'SUPER_ADMIN',
    },
  });

  await prisma.service.createMany({
    data: services.map((service) => ({ ...service, userId: user.id })),
  });
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
