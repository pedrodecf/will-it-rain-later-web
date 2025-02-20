import { ColumnDef } from "@tanstack/react-table"
import { getWeatherIcon } from "@/lib/getWeatherIcon"
import { getWeatherCondition } from "@/lib/getWeatherCondition"
import { ResponseWeatherType } from "@/pages/Home/schema"

export type ForecastItem = ResponseWeatherType['forecast'][number];

export const forecastTableColumns: ColumnDef<ForecastItem>[] = [
   {
      accessorKey: "date",
      header: "Date",
   },
   {
      accessorKey: "minMax",
      header: "Min / Max (°C)",
   },
   {
      accessorKey: "average",
      header: "Average (°C)",
      cell: ({ row }) => {
         const { average, weather } = row.original
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
      accessorKey: "rained",
      header: "Rained",
      cell: ({ row }) => {
         return row.original.rained ? (
            <span className="font-bold">
               Yes
            </span>
         )
            : "No"
      }
   },
   {
      accessorKey: "raintime",
      header: "Rain time",
      cell: ({ row }) => {
         return row.original.raintime ? (
            <span className="font-bold">
               {row.original.raintime}
            </span>
         )
            : "-"
      }
   },
   {
      accessorKey: "day",
      header: "Day",
      cell: ({ row }) => {
         const { date } = row.original
         const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" })
         return (
            <span>{day}</span>
         )
      },
   },
]
