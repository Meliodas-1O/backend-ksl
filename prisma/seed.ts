import { execSync } from "child_process";
import { readdirSync } from "fs";
import { join } from "path";

const dbPath = join(__dirname, "dev.db");
const sqlDir = join(__dirname, "../src/common/infrastructure/scripts");

// TODO: SQL files may need a specific order; prefix with numbers and sort them.
const sqlFiles = readdirSync(sqlDir)
    .filter(file => file.endsWith(".sql"));

for (const file of sqlFiles) {
    const filePath = join(sqlDir, file);
    console.log(`Seeding from ${filePath}...`);
    execSync(`sqlite3 ${dbPath} < "${filePath}"`);
}

console.log("Seeding OK")

