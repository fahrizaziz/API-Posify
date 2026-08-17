import { PrismaClient, Role } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await argon2.hash('owner123'); // Default password

  const owner = await prisma.user.upsert({
    where: { email: 'owner@posify.com' },
    update: {},
    create: {
      email: 'owner@posify.com',
      name: 'Super Owner',
      password: hashedPassword,
      role: Role.OWNER,
    },
  });

  console.log({ owner });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
