import { tripForDetailSchema, tripForListSchema } from "@/lib/zod/schema/trips";
import { z } from "zod";

export type TripForList = z.infer<typeof tripForListSchema>;

export type Trip = z.infer<typeof tripForDetailSchema>;
