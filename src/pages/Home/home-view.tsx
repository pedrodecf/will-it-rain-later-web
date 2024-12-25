import { UseFormReturn } from "react-hook-form";
import { ResponseWeatherType, SearchInputType, SearchOutputType, SearchType } from "./schema";
import { DatePicker } from "@/components/ui/date-picker";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiButton } from "@/components/ai-button";
import { addDays } from "date-fns";
import { CityCombobox } from "@/components/city-combobox";
import { DataTable } from "@/components/ui/data-table";
import { ForecastItem, forecastTableColumns } from "@/components/ui/forecast-table/columns";
import { YearItem } from "@/components/ui/history-table/year-columns";
import { getDataMock } from "./api-respose-mock";
import { YearsTable } from "@/components/years-table";

type THomeView = {
   formMethods: UseFormReturn<SearchInputType, unknown, SearchOutputType>
   onSubmit: (data: SearchType) => Promise<any>;
   isLoading?: boolean;
   weatherData?: ResponseWeatherType;
}

export const HomeView = ({ formMethods, onSubmit, isLoading }: THomeView) => {
   const { data } = getDataMock()

   const allForecasts = data.reduce((acc, item) => {
      return acc.concat(item.forecast)
   }, [] as ForecastItem[])

   const allYears = data.reduce((acc, item) => {
      return acc.concat(item.years)
   }, [] as YearItem[])

   return (
      <div className="min-h-screen h-full flex items-center justify-center bg-background">
         <div className="container max-w-[1024px] text-center flex flex-col">
            {getHero()}
            {getSearchForm()}
            <DataTable
               className="mt-12"
               headerClassName="bg-[#dcdcdc] text-primary py-4"
               columns={forecastTableColumns}
               data={allForecasts}
            />
            <YearsTable
               data={allYears}
               className="mt-4"
               headerClassName="py-4"
               rowClassName="text-primary text-base"
            />
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
            <CityCombobox
               countryCode="BR"
               name="city"
               control={control}
               helperText={errors.city?.message}
               iconStart={Plane}
               iconClassName="text-muted-foreground"
               className="max-w-96 "
               placeholder="What is your destination?"
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

