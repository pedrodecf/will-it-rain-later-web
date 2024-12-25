import { ColumnDef } from "@tanstack/react-table"
import { getWeatherIcon } from "@/lib/getWeatherIcon"
import { getWeatherCondition } from "@/lib/getWeatherCondition"
import { ResponseWeatherType } from "@/pages/Home/schema";
export type HistoryItem = ResponseWeatherType['years'][number]['history'][number];

export const historyColumns: ColumnDef<HistoryItem>[] = [
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
    header: "Weather",
    cell: ({ row }) => {
      const { weather } = row.original
      return <span>{getWeatherCondition(weather)}</span>
    },
  },
  {
    accessorKey: "rained",
    header: "Rained",
    cell: ({ row }) => {
      return row.original.rained ? "Yes" : "No"
    },
  },
  {
    accessorKey: "raintime",
    header: "Rain time",
    cell: ({ row }) => {
      return row.original.raintime ? row.original.raintime : "-"
    },
  },
]
