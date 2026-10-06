import "dotenv/config";
import bcrypt from "bcryptjs"
import { env } from "@/src/lib/env";
import prisma from "../src/lib/prisma";

const SALTROUNDS = 10;

async function main() {

  const password = env.ADMIN_PASSWORD;
  const email = env.ADMIN_EMAIL;
  const hashPassword = await bcrypt.hash(password, SALTROUNDS)

  await prisma.admin.create({
    data: {
      name: "Younas Khan",
      email: email,
      password: hashPassword,
    },
  });
  console.log("Admin created");

  // await prisma.admin.delete({
  //   where: {email: email},
  // })

  // console.log("Admin Deleted!")
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});