import { z } from "zod";

export const dataTableSchema = z.object({
   date: z.string(),
   minMax: z.string(),
   average: z.object({
      avatar: z.string(),
      celsius: z.string(),
   }),
   weather: z.string(),
   rained: z.boolean(),
   raintime: z.string().optional().nullable(),
})

export type DataTableType = z.infer<typeof dataTableSchema>;