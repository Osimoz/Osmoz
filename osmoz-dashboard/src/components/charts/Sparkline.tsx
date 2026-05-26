import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrencyShort } from '../../utils/formatters';

interface Point {
  label: string;
  value: number;
}

export function Sparkline({ data }: { data: Point[] }) {
  return (
    <div style={{ width: '100%', height: 80 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
          <XAxis dataKey="label" hide />
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Tooltip
            cursor={{ stroke: '#E8E4DC' }}
            contentStyle={{
              background: '#fff',
              border: '1px solid #E8E4DC',
              borderRadius: 8,
              fontSize: 12,
              padding: '6px 10px',
            }}
            formatter={(v: number) => formatCurrencyShort(v)}
            labelFormatter={(l: string) => l}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6B1228"
            strokeWidth={2}
            dot={{ r: 2, fill: '#6B1228' }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
