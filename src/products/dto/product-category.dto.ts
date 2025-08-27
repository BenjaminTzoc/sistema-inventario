import { z } from 'zod';

export const CreateProductCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().optional(),
  default_unit_measure: z.number().int(),
});

export const UpdateProductCategorySchema = CreateProductCategorySchema.partial();