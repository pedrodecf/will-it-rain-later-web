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