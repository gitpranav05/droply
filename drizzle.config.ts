import * as dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';

dotenv.config({path:".env.local"})

if(!process.env.DATABASE_URL!){
    throw new Error("Database URL is not set")
}
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  // Configure migrations table
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
  // Additional options
  verbose: true,
  strict: true,
});
