import { ColumnDef } from "@tanstack/react-table";
import { HistoryTableType } from "./schema";
import { getWeatherIcon } from "@/lib/getWeatherIcon";
import { getWeatherCondition } from "@/lib/getWeatherCondition";
import { CircleHelp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

export const historyTableColumns: ColumnDef<HistoryTableType>[] = [
   {
      accessorKey: "year",
      header: "Year",
   },
   {
      accessorKey: "average",
      header: "Average (°C)",
      cell: ({ row }) => {
         const { average } = row.original
         const { weather } = row.original
         return (
            <div className="flex items-center gap-2 justify-center">
               <img src={getWeatherIcon(weather)} alt="Weather icon" width={24} height={24} />
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
         return (
            <span>{getWeatherCondition(weather)}</span>
         )
      }
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
                     <p className="max-w-xs whitespace-pre-wrap break-words">The BM index indicates the chance of rain throughout
                        the year. Higher values suggest a smaller chance, but
                        do not completely rule it out.</p>
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
         return (
            <span className="blur" > $X.XXXX,XX</span>
         )
      }
   },
]