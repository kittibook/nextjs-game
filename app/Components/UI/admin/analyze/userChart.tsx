import { getAuth } from "@/app/Services/api.service";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// กราฟ ผู้เข้าร่วมการประเมิน
interface Data {
    DatasetId: number
    DatasetName: string
    userF: number
    userM: number
}
interface Prop {
    dataSetId: number | null
}
interface dataNew {
    name: string
    value: number
}
export default function UserChart({ dataSetId }: Prop) {

    const [data, setData] = useState<dataNew[] | []>([])
    const COLORS = ["#8884d8", "#82ca9d"]
    
    useEffect(() => {
        fetchData()
    }, [dataSetId])

    const fetchData = async () => {
        try {
            const res = await getAuth('/admin/analyze/user/' + dataSetId)
            console.log(res)
            if (res.success) {
                let newData = [
                    { name: "ชาย", value: res.data[0].userM },
                    { name: "หญิง", value: res.data[0].userF },
                ];

                setData(newData)

            }
        } catch (error) {

        }
    }
    return (

        <>
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-700">
                        ผู้เข้าร่วมการประเมิน
                    </h2>
                </div>

                {/* <button className="text-sm  bg-btn-dashboard border border-main-2 rounded p-2 text-main">View Report</button> */}
            </div>
            <ResponsiveContainer width="100%" height={250}>
                {/* <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="DatasetName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="userM" name='ชาย' fill="#8884d8" />
                    <Bar dataKey="userF" name='หญิง' fill="#82ca9d" />
                    
                </BarChart> */}

                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        label={({ name, value }) => `${name} : ${value} ท่าน`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}