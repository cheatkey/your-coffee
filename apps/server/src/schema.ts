import { buildSchema } from "graphql";
import fs from "fs";
import path from "path";

const schemaPath = path.join(__dirname, "schema.graphql");

export const schema = buildSchema(fs.readFileSync(schemaPath, "utf-8"));
