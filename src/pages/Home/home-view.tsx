import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SearchInputType, SearchOutputType, SearchType } from "./schema";
import { DatePicker } from "@/components/ui/date-picker";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiButton } from "@/components/ai-button";
import { addDays } from "date-fns"

type THomeView = {
   formMethods: UseFormReturn<SearchInputType, unknown, SearchOutputType>
   onSubmit: (data: SearchType) => Promise<any>;
   isLoading?: boolean;
   weatherData?: any;
}

export const HomeView = ({ formMethods, onSubmit, isLoading }: THomeView) => {
   return (
      <div className="min-h-screen h-full flex items-center justify-center bg-background">
         <div className="container text-center flex flex-col">
            {getHero()}
            {getSearchForm()}
         </div>
      </div>
   )

   function getHero() {
      return (
         <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-[96px] leading-none text-primary">Will It Rain Later?</h1>
            <p className="text-lg leading-none text-primary">Find out if it might rain on the day of your trip</p>
            <AiButton className="max-w-48 w-full" />
         </div>
      )
   }

   function getSearchForm() {
      const {
         control,
         handleSubmit,
         formState: { errors },
         watch
      } = formMethods

      const startDate = watch("startDate")
      return (
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row gap-2 mt-12 items-center justify-center w-full ">
            <Input
               name='city'
               control={control}
               helperText={errors.city?.message}
               placeholder="What is your destination?"
               iconStart={Plane}
               iconClassName="text-muted-foreground"
               className="max-w-96 "
            />
            <DatePicker
               name="startDate"
               control={control}
               helperText={errors.startDate?.message}
               placeholder="Start date"
               className="w-full max-w-52"
               disabledDates={(date) => date > addDays(new Date(), 365)}
            />
            <DatePicker
               name="endDate"
               control={control}
               helperText={errors.endDate?.message}
               placeholder="End date"
               className="w-full max-w-52"
               readOnly={!startDate}
               tooltipMessage="Select a start date first"
               disabledDates={(date) => {
                  if (!startDate) return true
                  return date < startDate || date > addDays(startDate, 7)
               }}
            />
            <Button
               type="submit"
               disabled={isLoading}
            >
               Search
            </Button>
         </form>
      )
   }
}

