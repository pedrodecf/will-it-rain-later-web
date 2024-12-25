import { ColumnDef } from "@tanstack/react-table"
import { getWeatherIcon } from "@/lib/getWeatherIcon"
import { getWeatherCondition } from "@/lib/getWeatherCondition"
import { ChevronRight, CircleHelp } from "lucide-react"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "../tooltip"
import { ResponseWeatherType } from "@/pages/Home/schema"

export type YearItem = ResponseWeatherType["years"][number];

export const yearColumns: ColumnDef<YearItem>[] = [
   {
      id: "expander",
      header: () => null,
      cell: () => (
         <button>
            <ChevronRight size={16} />
         </button>
      ),
   },
   {
      accessorKey: "year",
      header: "Year",
   },
   {
      accessorKey: "average",
      header: "Average (°C)",
      cell: ({ row }) => {
         const { average, weather } = row.original
         return (
            <div className="flex items-center gap-2 justify-center">
               <img
                  src={getWeatherIcon(weather)}
                  alt="Weather icon"
                  width={24}
                  height={24}
               />
               <span>{average}</span>
            </div>
         )
      },
   },
   {
      accessorKey: "weather",
      header: "Weather condition",
      cell: ({ row }) => {
         const { weather } = row.original
         return <span>{getWeatherCondition(weather)}</span>
      },
   },
   {
      accessorKey: "bmIndex",
      header: () => (
         <span className="flex gap-2 items-center justify-center">
            BM Index
            <TooltipProvider delayDuration={0}>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <CircleHelp size={16} />
                  </TooltipTrigger>
                  <TooltipContent>
                     <p className="max-w-xs whitespace-pre-wrap break-words">
                        The BM index indicates the chance of rain throughout the year.
                        Higher values suggest a smaller chance, but do not completely
                        rule it out.
                     </p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </span>
      ),
   },
   {
      accessorKey: "flightPrice",
      header: "Flight price",
      cell: ({ row }) => {
         return <span className="blur">{row.original.flightPrice || "-"}</span>
      },
   },
]
