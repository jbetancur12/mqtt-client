import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { Sensor } from './Status'

interface Props {
  data?: Sensor[]
}

const Chart = ({ data }: Props) => {
  const dataTrasnformed = data?.map((dt) => {
    return {
      temperature: dt.temperature,
      humidity: dt.humidity,
      createat: new Date(dt.createat).toLocaleString()
    }
  })

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={dataTrasnformed}>
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="humidity"
          stroke="#82ca9d"
          dot={false}
        />
        <CartesianGrid stroke="#ccc" />
        <Legend />
        <XAxis dataKey="createat" hide />
        <YAxis yAxisId="left" unit="C°" />
        <YAxis yAxisId="right" orientation="right" unit="%" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
