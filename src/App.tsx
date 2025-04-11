import { FinanceChart } from "./components/finance-chart/FinanceChart"
import { groupByMonth, GroupedByMonth } from "./utils/groupByMonth"
import { generateMockData } from "./utils/generateMockData"
import React, { useState, useEffect } from "react"

function App() {
  const [data, setData] = useState<GroupedByMonth[]>([])
  useEffect(() => {
    if (data.length > 0) {
      return
    }

    const generatedData = generateMockData(1000)
    const monthlyData = groupByMonth(generatedData)

    const formattedData = monthlyData.map((entry) => ({
      month: entry.month,
      income: entry.income,
      expanses: entry.expanses,
      revenue: entry.revenue,
      debt: entry.debt,
    }))

    setData(formattedData)
    console.log("Formatted data", formattedData)
    setData(formattedData)
  }, [])

  return (
    <section className="container">
      <div className="flex flex-col items-center flex-wrap">
        <FinanceChart data={data} />
      </div>
    </section>
  )
}

export default App
