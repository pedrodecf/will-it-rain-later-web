import { DataTable } from "./ui/data-table"
import { historyColumns, HistoryItem } from "./ui/history-table/history-columns"

interface HistorySubTableProps {
   items: HistoryItem[]
}

export function HistorySubTable({ items }: HistorySubTableProps) {
   return (
      <div className="mt-2 ml-6">
         <DataTable
            columns={historyColumns}
            data={items}
            className="border-none"
            headerClassName="bg-[#fcfcfc]"
            rowClassName="text-sm bg-[#fcfcfc]"
         />
      </div>
   )
}
