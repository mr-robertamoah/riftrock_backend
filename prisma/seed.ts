import { PrismaClient } from '@prisma/client';
import * as bcryt from 'bcrypt';
import { detailsKeys } from '../src/details/details.service';

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

const details = [
  {
    key: detailsKeys.tagline,
    value: {
      gold: 'Empowering Mining Excellence',
      black: 'through Reliable Services',
    },
    info: 'The gold section represents gold portion of the tagline. Same applies to the black',
  },
  {
    key: detailsKeys.taglineShort,
    value: {
      message:
        'Leading the industry with innovative solutions and sustainable practices',
    },
    info: 'This is the text that appears under the tagline on the Hero/Main section of the Home page.',
  },
  {
    key: detailsKeys.taglineMessage,
    value: {
      message:
        'RiftRock is a leading provider of comprehensive mining services, dedicated to delivering exceptional support to the mining industry. Our expertise spans general consumables, transportation, and rental equipment, ensuring seamless operations for our clients.',
    },
    info: 'This represents the text which appears under the tagline in the About section of the Home page.',
  },
  {
    key: detailsKeys.mission,
    value: {
      message:
        'To provide top-notch mining services, fostering long-term partnerships with our clients, while prioritizing safety, efficiency, and sustainability.',
    },
  },
  {
    key: detailsKeys.vision,
    value: {
      message:
        'To become the preferred mining services partner in [Region/Industry], recognized for our commitment to excellence, innovation, and customer satisfaction.',
    },
  },
  {
    key: detailsKeys.contactMessage,
    value: {
      message:
        'Ready to start your next mining project? Contact us today for expert consultation',
      tagline: 'Get in touch with us',
    },
    info: 'The tagline represents the text which appears immediately under the Contact header on the Contact section of the Home page. The message follows after the contact tagline',
  },
  {
    key: detailsKeys.servicesMessage,
    value: {
      message:
        'Comprehensive mining solutions tailored to meet your specific needs',
    },
    info: 'This represents the text which appears under the Services header on the Services section of the Home page.',
  },
];

async function main() {
  let user = await prisma.user.findFirst({
    where: {
      email: process.env.ADMIN_EMAIL ?? 'mr_robertamoah@yahoo.com',
    },
  });

  if (!user)
    user = await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL ?? 'mr_robertamoah@yahoo.com',
        password: await bcryt.hash(
          process.env.ADMIN_PASSWORD ?? 'password',
          10,
        ),
        firstName: 'Robert',
        lastName: 'Amoah',
        role: 'SUPER_ADMIN',
      },
    });

  if (!(await prisma.service.findFirst({ where: { userId: user.id } })))
    await prisma.service.createMany({
      data: services.map((service) => ({ ...service, userId: user.id })),
    });

  if (!(await prisma.detail.findFirst({ where: { userId: user.id } })))
    await prisma.detail.createMany({
      data: details.map((detail) => ({ ...detail, userId: user.id })),
    });
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
