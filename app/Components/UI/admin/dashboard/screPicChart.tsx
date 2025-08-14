import { getAuth } from "@/app/Services/api.service";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface ScoreData {
    name: string
    value: number
    color: string
}

export default function ScorePicChart() {
    const data04 = [
        { name: "1 คะแนน", value: 2, color: "#C7CEFF" },
        { name: "2 คะแนน", value: 4, color: "#8593ED" },
        { name: "3 คะแนน", value: 5, color: "#5A6ACF" },
    ];

    const [data, setData] = useState<ScoreData[] | []>([])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await getAuth('/admin/dashboard/scoredistribution')
            if (res.success) {
                const newData = Object.entries(res.percentages).map(([score, percentage]) => {
                    return {
                        name: score,
                        value: Number(percentage),
                        color: "#C7CEFF"
                    };
                });
                setData(newData)
                // console.log(newData)
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-700">
                        คะแนน
                    </h2>
                    <h3 className="text-sm text-slate-500">
                        วันที่ 1 ธันวาคม  2567 - 25 มกราคม 2568
                    </h3>
                </div>
            </div>
            <div className="flex justify-between items-center w-full">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={data04[index % data04.length].color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

            </div>
        </>
    )
}