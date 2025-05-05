import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


export default function RiskChart() {
    const data02 = [
        { name: "ความเสี่ยงต่ำ", value: 2 },
        { name: "ความเสี่ยงปานกลาง", value: 4 },
        { name: "ความเสี่ยงสูง", value: 5 },
    ];

    const COLORS = ["#C7CEFF", "#8593ED", "#5A6ACF"];
    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-700">
                        ความเสี่ยง
                    </h2>
                    <h3 className="text-sm text-slate-500">
                        วันที่ 1 ธันวาคม  2567 - 25 มกราคม 2568
                    </h3>
                </div>

                <button className="text-sm  bg-btn-dashboard border border-main-2 rounded p-2 text-main">View Report</button>
            </div>
            <div className="flex justify-between items-center w-full">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data02}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {data02.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>

                </ResponsiveContainer>

            </div>
        </>
    )
}