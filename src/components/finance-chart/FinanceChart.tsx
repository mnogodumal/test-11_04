import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import dayjs from "dayjs"
import "dayjs/locale/ru"

dayjs.locale("ru")

export function FinanceChart({ data }) {
  const getColor = (type: string) => {
    switch (type) {
      case "income":
        return "#45aaf2"
      case "expanses":
        return "#30c7dc"
      case "revenue":
        return "#73cf7a"
      case "debt":
        return "#ff9800"
      default:
        return "#a060fc"
    }
  }

  return (
    <div className="w-[804px] h-[254px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(val) =>
              dayjs(val)
                .format("MMM")
                .replace(/^\w/, (c) => c.toUpperCase())
            }
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <YAxis tick={false} />
          <Tooltip isAnimationActive={false} trigger="hover" shared={true} />
          <Legend />
          {["income", "expanses", "revenue", "debt"].map((type) => (
            <Line
              strokeWidth={3}
              dot={false}
              key={type}
              type="monotone"
              dataKey={type}
              stroke={getColor(type)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
