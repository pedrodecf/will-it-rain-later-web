import { z } from "zod";

export const forescastTableSchema = z.object({
   date: z.string(),
   minMax: z.string(),
   average: z.string(),
   weather: z.enum(["sunny", "cloudy", "partly-cloudy", "heavy-rain", "rain", "rain-sun", "drizzle", "thunderstorm"]),
   rained: z.boolean(),
   raintime: z.string().optional().nullable(),
})

export type ForecastTableType = z.infer<typeof forescastTableSchema>;
