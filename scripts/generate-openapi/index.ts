import fs from "fs";
import path from "path";
import * as yaml from "yaml";
import { z } from "zod";
import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { pathSchemas } from "@/lib/zod/schema";

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

// API定義のパスを全て登録する
pathSchemas.forEach((schema) => {
  registry.registerPath(schema);
});
// // componentを全て登録する
// componentSchemas.forEach((schema) => {
//   registry.register(schema.name, schema.properties);
// });

const generator = new OpenApiGeneratorV3(registry.definitions);

const docs = generator.generateDocument({
  openapi: "3.1.0",
  info: {
    title: "tripeasy",
    version: "1.0.0",
    description: "TripeasyのAPI仕様書",
  },
});

const yamlDocs = yaml.stringify(docs);

const openApiFilePath = path.join(
  process.cwd(),
  "services",
  "api",
  "swagger.yml"
);

fs.writeFileSync(openApiFilePath, yamlDocs, { encoding: "utf-8" });
