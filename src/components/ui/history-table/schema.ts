import { z } from "zod";

export const historyTableSchema = z.object({
   year: z.string(),
   average: z.string(),
   weather: z.enum(["sunny", "cloudy", "partly-cloudy", "heavy-rain", "rain", "rain-sun", "drizzle", "thunderstorm"]),
   bmIndex: z.string(),
   flightPrice: z.string().optional().nullable(),
})

export type HistoryTableType = z.infer<typeof historyTableSchema>;