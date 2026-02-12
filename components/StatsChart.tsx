import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const data = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 280 },
  { name: "Apr", value: 350 },
  { name: "May", value: 420 },
  { name: "Jun", value: 520 }
];

// Custom tooltip (dark mode friendly)
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow">
        Growth: {payload[0].value}
      </div>
    );
  }
  return null;
};

const StatsChart: React.FC = () => {
  return (
    <div className="bg-slate-800/70 dark:bg-slate-900 rounded-2xl p-6 shadow-lg">

      <div className="mb-3">
        <p className="text-xs text-slate-400 uppercase">
          Member Growth
        </p>
        <h3 className="text-xl font-bold text-white">
          +240% <span className="text-sm text-slate-400">per quarter</span>
        </h3>
      </div>

      <div className="h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#38bdf8"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default StatsChart;
