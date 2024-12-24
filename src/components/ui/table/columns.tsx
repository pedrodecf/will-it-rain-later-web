import { ColumnDef } from "@tanstack/react-table"
import { DataTableType } from "./schema"

export const columns: ColumnDef<DataTableType>[] = [
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
         const { avatar, celsius } = row.original.average
         return (
            <div className="flex items-center gap-2 justify-center">
               <img src={avatar} alt="Weather icon" width={24} height={24} />
               <span>{celsius}</span>
            </div>
         )
      },
   },
   {
      accessorKey: "weather",
      header: "Weather condition",
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
]
