import dayjs from "dayjs"
import { FinanceEntry } from "./generateMockData"

export interface GroupedByMonth {
  month: string
  income?: number
  expanses?: number
  revenue?: number
  debt?: number
}

export function groupByMonth(data: FinanceEntry[]): GroupedByMonth[] {
  const grouped = new Map<string, GroupedByMonth>()

  data.forEach((entry) => {
    const key = dayjs(entry.date).format("YYYY-MM")

    if (!grouped.has(key)) {
      grouped.set(key, {
        month: key,
        income: 0,
        expanses: 0,
        revenue: 0,
        debt: 0,
      })
    }

    const group = grouped.get(key)!

    group[entry.type] = (group[entry.type] || 0) + entry.amount
  })

  return Array.from(grouped.values()).sort((a, b) =>
    a.month.localeCompare(b.month)
  )
}
