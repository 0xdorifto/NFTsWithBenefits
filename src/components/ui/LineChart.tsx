import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  label: string;
}

export function LineChart({ data, xKey, yKey, label }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsLineChart data={data}>
        <XAxis dataKey={xKey} stroke="#888888" />
        <YAxis stroke="#888888" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke="#3b82f6"
          name={label}
          strokeWidth={2}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
