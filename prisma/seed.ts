import { execSync } from "child_process";
import { readdirSync } from "fs";
import { join } from "path";
import { PrismaClient } from "../src/generated/prisma";

const dbPath = join(__dirname, "dev.db");
const sqlDir = join(__dirname, "../src/common/infrastructure/scripts");

const prisma = new PrismaClient();

async function main() {
  const roles = ["ADMIN", "TEACHER", "STUDENT", "PARENT"];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
      },
    });
  }

  console.log("Roles seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// TODO: SQL files may need a specific order; prefix with numbers and sort them.
const sqlFiles = readdirSync(sqlDir).filter((file) => file.endsWith(".sql"));

for (const file of sqlFiles) {
  const filePath = join(sqlDir, file);
  console.log(`Seeding from ${filePath}...`);
  execSync(`sqlite3 ${dbPath} < "${filePath}"`);
}
console.log("Seeding OK");
