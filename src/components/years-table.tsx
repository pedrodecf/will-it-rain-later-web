import { useState } from "react"
import {
   flexRender,
   getCoreRowModel,
   useReactTable,
} from "@tanstack/react-table"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { yearColumns, YearItem } from "./ui/history-table/year-columns"
import { HistorySubTable } from "./history-sub-table"
import React from "react"

interface YearsTableProps {
   data: YearItem[]
   className?: string
   headerClassName?: string
   rowClassName?: string
}

export function YearsTable({
   data,
   className,
   headerClassName,
   rowClassName,
}: YearsTableProps) {
   const [expandedRowId, setExpandedRowId] = useState<string | null>(null)

   const table = useReactTable<YearItem>({
      data,
      columns: yearColumns.map((col) => {
         if (col.id === "expander") {
            return {
               ...col,
               cell: ({ row }) => {
                  const isRowExpanded = expandedRowId === row.id

                  return (
                     <button
                        onClick={() => {
                           setExpandedRowId(isRowExpanded ? null : row.id)
                        }}
                     >
                        <svg
                           className={`transition-transform duration-300 ${isRowExpanded ? "rotate-90" : ""
                              }`}
                           width="16"
                           height="16"
                           fill="none"
                           viewBox="0 0 24 24"
                        >
                           <path
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 18l6-6-6-6"
                           />
                        </svg>
                     </button>
                  )
               },
            }
         }
         return col
      }),
      getCoreRowModel: getCoreRowModel(),
   })

   return (
      <div className={cn("rounded-md border", className)}>
         <Table>
            <TableHeader>
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map((header) => (
                        <TableHead
                           key={header.id}
                           className={cn("text-center font-bold text-primary bg-[#fcfcfc]", headerClassName)}
                        >
                           {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                     ))}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {table.getRowModel().rows.map((row) => {
                  const isRowExpanded = expandedRowId === row.id
                  return (
                     <React.Fragment key={row.id}>
                        <TableRow className="hover:bg-inherit">
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className={cn("py-4", rowClassName)}>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>

                        {isRowExpanded && (
                           <TableRow className="hover:bg-[#fcfcfc] bg-[#fcfcfc]">
                              <TableCell colSpan={row.getVisibleCells().length} className="pr-8 py-4">
                                 <HistorySubTable items={row.original.history} />
                              </TableCell>
                           </TableRow>
                        )}
                     </React.Fragment>
                  )
               })}
            </TableBody>
         </Table>
      </div>
   )
}
