import { getAuth } from "@/app/Services/api.service";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
interface Props { 
    dataSetId: number | null 
}
interface Data {
    name : string
    value : number
}
export default function RiskChart({dataSetId} : Props) {
    const [data, setData] = useState<Data[] | []>([])
    useEffect(() => {
        fetchData()
    }, [dataSetId])

    const fetchData = async () => {
        try {
            const res = await getAuth('/admin/analyze/risk/' + dataSetId)
            console.log(res)
            if (res.success) {
                setData(res.data)

            }
        } catch (error) {

        }
    }

    const COLORS = ["#00c951", "#ff6467"];
    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-700">
                        ผลการประเมิน
                    </h2>
                </div>

                {/* <button className="text-sm  bg-btn-dashboard border border-main-2 rounded p-2 text-main">View Report</button> */}
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