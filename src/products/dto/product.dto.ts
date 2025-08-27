import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  bar_code: z.string().min(1, 'El código de barras es obligatorio'),
  description: z.string().optional(),
  price: z.number().nonnegative('El precio no puede ser negativo'),
  stock: z.number().nonnegative('El stock no puede ser negativo').optional(),
  unit_measure: z.number().int().optional(),
  category: z.number().int().optional(),
}).refine((data) => data.unit_measure || data.category, {
  error: 'Debe proporcionar una unidad de medida o una categoría',
})

export const UpdateProductSchema = CreateProductSchema.partial();