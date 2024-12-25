import { z } from "zod";

export const searchSchema = z.object({
   city: z
      .string({ required_error: 'Required field' })
      .min(1, 'Minimum 1 character')
      .max(50, 'Maximum 50 characters')
      .trim(),
   startDate: z
      .date({ message: 'Required field' })
      .refine(date => date, 'Required field')
      .transform(date => {
         return date.toISOString();
      }),
   endDate: z
      .date({ message: 'Required field' })
      .refine(date => date, 'Required field')
      .transform(date => {
         return date.toISOString();
      }),
})

export type SearchType = z.infer<typeof searchSchema>;
export type SearchInputType = z.input<typeof searchSchema>;
export type SearchOutputType = z.output<typeof searchSchema>;

export const responseWeatherSchema = z.object({
   forecast: z.array(z.object({
      date: z.string(),
      minMax: z.string(),
      average: z.string(),
      weather: z.enum(["sunny", "cloudy", "partly-cloudy", "heavy-rain", "rain", "rain-sun", "drizzle", "thunderstorm"]),
      rained: z.boolean(),
      raintime: z.string().optional().nullable(),
   })),
   years: z.array(z.object({
      year: z.string(),
      average: z.string(),
      weather: z.enum(["sunny", "cloudy", "partly-cloudy", "heavy-rain", "rain", "rain-sun", "drizzle", "thunderstorm"]),
      bmIndex: z.string(),
      flightPrice: z.string().optional().nullable(),
      history: z.array(z.object({
         date: z.string(),
         minMax: z.string(),
         average: z.string(),
         weather: z.enum(["sunny", "cloudy", "partly-cloudy", "heavy-rain", "rain", "rain-sun", "drizzle", "thunderstorm"]),
         rained: z.boolean(),
         raintime: z.string().optional().nullable(),
      })),
   }))
})

export type ResponseWeatherType = z.infer<typeof responseWeatherSchema>;
export type ResponseWeatherInputType = z.input<typeof responseWeatherSchema>;
export type ResponseWeatherOutputType = z.output<typeof responseWeatherSchema>;