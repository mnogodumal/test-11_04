import dayjs from "dayjs"

const types = ["expanses", "income", "revenue", "debt"] as const
const divisions = ["B2B", "B2C"] as const

export type OperationType = (typeof types)[number]
export type Division = (typeof divisions)[number]

export interface FinanceEntry {
  division: Division
  date: string
  amount: number
  type: OperationType
}

export function generateMockData(count: number): FinanceEntry[] {
  const data: FinanceEntry[] = []

  const start = dayjs("2023-01-01")
  const end = dayjs("2023-12-31")
  const daysRange = end.diff(start, "day")

  for (let i = 0; i < count; i++) {
    const randomOffset = Math.floor(Math.random() * daysRange)
    const randomDate = start.add(randomOffset, "day")

    data.push({
      division: divisions[Math.floor(Math.random() * divisions.length)],
      date: randomDate.toISOString(),
      amount: Math.floor(Math.random() * 30000),
      type: types[Math.floor(Math.random() * types.length)],
    })
  }

  return data
}
