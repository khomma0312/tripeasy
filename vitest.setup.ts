import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "@/mocks/api/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
