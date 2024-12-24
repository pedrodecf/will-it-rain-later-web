import {
   ColumnDef,
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

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[]
   data: TData[]
   className?: string
   headerClassName?: string
   rowClassName?: string
}

export function DataTable<TData, TValue>({
   columns,
   data,
   className,
   headerClassName,
   rowClassName,
}: DataTableProps<TData, TValue>) {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   })

   return (
      <div className={cn("rounded-md border", className)}>
         <Table>
            <TableHeader>
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map((header) => {
                        return (
                           <TableHead key={header.id} className={cn("text-center font-bold bg-[#F7F7F7]", headerClassName)}>
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                 )}
                           </TableHead>
                        )
                     })}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                     <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="hover:bg-inherit"
                     >
                        {row.getVisibleCells().map((cell) => (
                           <TableCell key={cell.id} className={cn("py-4", rowClassName)}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   )
}
