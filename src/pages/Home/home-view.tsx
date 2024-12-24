import { UseFormReturn } from "react-hook-form";
import { SearchInputType, SearchOutputType, SearchType } from "./schema";
import { DatePicker } from "@/components/ui/date-picker";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiButton } from "@/components/ai-button";
import { addDays } from "date-fns"
import { CityCombobox } from "@/components/city-combobox";
import { DataTable } from "@/components/ui/table/data-table";
import { columns } from "@/components/ui/table/columns";
import { DataTableType } from "@/components/ui/table/schema";

type THomeView = {
   formMethods: UseFormReturn<SearchInputType, unknown, SearchOutputType>
   onSubmit: (data: SearchType) => Promise<any>;
   isLoading?: boolean;
   weatherData?: any;
}

export const HomeView = ({ formMethods, onSubmit, isLoading }: THomeView) => {

   const data: DataTableType[] = [
      {
         date: "2021-10-01",
         minMax: "22°C / 30°C",
         average: {
            avatar: "https://www.weatherbit.io/static/img/icons/r01d.png",
            celsius: "26°C"
         },
         weather: "Mostly Sunny",
         rained: false,
      },
      {
         date: "2021-10-02",
         minMax: "23°C / 29°C",
         average: {
            avatar: "https://www.weatherbit.io/static/img/icons/r01d.png",
            celsius: "24°C"
         },
         weather: "Mostly Sunny",
         rained: true,
         raintime: "10:00 - 11:00"
      },
   ]

   return (
      <div className="min-h-screen h-full flex items-center justify-center bg-background">
         <div className="container max-w-[1024px] text-center flex flex-col">
            {getHero()}
            {getSearchForm()}
            <DataTable className="mt-12" columns={columns} data={data} />
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

