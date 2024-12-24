import { UseFormReturn } from "react-hook-form";
import { SearchInputType, SearchOutputType, SearchType } from "./schema";
import { DatePicker } from "@/components/ui/date-picker";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiButton } from "@/components/ai-button";
import { addDays } from "date-fns"
import { CityCombobox } from "@/components/city-combobox";
import { DataTable } from "@/components/ui/data-table";
import { forecastTableColumns } from "@/components/ui/forecast-table/columns";
import { ForecastTableType } from "@/components/ui/forecast-table/schema";
import { HistoryTableType } from "@/components/ui/history-table/schema";
import { historyTableColumns } from "@/components/ui/history-table/columns";

type THomeView = {
   formMethods: UseFormReturn<SearchInputType, unknown, SearchOutputType>
   onSubmit: (data: SearchType) => Promise<any>;
   isLoading?: boolean;
   weatherData?: any;
}

export const HomeView = ({ formMethods, onSubmit, isLoading }: THomeView) => {

   const data: ForecastTableType[] = [
      {
         date: "2021-10-01",
         minMax: "22°C / 30°C",
         average: "26°C",
         weather: "sunny",
         rained: false,
      },
      {
         date: "2021-10-02",
         minMax: "23°C / 29°C",
         average: "24°C",
         weather: "cloudy",
         rained: true,
         raintime: "10:00 - 11:00"
      },
   ]

   const otherData: HistoryTableType[] = [
      {
         year: "2020",
         average: "25°C",
         weather: "sunny",
         bmIndex: "3",
         flightPrice: "R$ 500",
         history: [
            {
               date: "2020-10-01",
               minMax: "22°C / 30°C",
               average: "26°C",
               weather: "sunny",
               rained: false,
            },
            {
               date: "2020-10-02",
               minMax: "23°C / 29°C",
               average: "24°C",
               weather: "cloudy",
               rained: true,
               raintime: "10:00 - 11:00"
            },
         ]
      },
      {
         year: "2019",
         average: "24°C",
         weather: "thunderstorm",
         bmIndex: "2",
         flightPrice: "R$ 450",
         history: [
            {
               date: "2019-10-01",
               minMax: "22°C / 30°C",
               average: "26°C",
               weather: "sunny",
               rained: false,
            },
            {
               date: "2019-10-02",
               minMax: "23°C / 29°C",
               average: "24°C",
               weather: "cloudy",
               rained: true,
               raintime: "10:00 - 11:00"
            },
         ]
      },
   ]

   return (
      <div className="min-h-screen h-full flex items-center justify-center bg-background">
         <div className="container max-w-[1024px] text-center flex flex-col">
            {getHero()}
            {getSearchForm()}
            <DataTable
               className="mt-12"
               headerClassName="bg-[#D9D9D9] text-primary py-4"
               columns={forecastTableColumns}
               data={data}
            />
            <DataTable
               className="mt-4"
               headerClassName="py-4"
               rowClassName="text-primary text-base"
               columns={historyTableColumns}
               data={otherData}
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

