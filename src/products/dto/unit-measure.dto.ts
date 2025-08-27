import { z } from "zod";

export const CreateUnitMeasureSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    description: z.string().optional(),
    acronym: z.string(),
    allow_decimals: z.boolean().optional(),
});

export const UpdateUnitMeasureSchema = CreateUnitMeasureSchema.partial();