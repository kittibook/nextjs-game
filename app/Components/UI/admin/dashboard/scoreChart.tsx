import { getAuth } from "@/app/Services/api.service";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Data {
    average: number
    name: string
}

export default function ScoreChart() {
    const [data, setData] = useState<Data[] | []>([])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await getAuth('/admin/dashboard/scoreaverage')
            setData(res.averages)
        } catch (error) {

        }
    }

    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-700">
                        การได้คะแนนจากเกม
                    </h2>
                    <h3 className="text-sm text-slate-500">
                        วันที่ 1 ธันวาคม  2567 - 25 มกราคม 2568
                    </h3>
                </div>
            </div>
            <div className="flex justify-between items-center w-full">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart width={730} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" name='คะแนน' fill="#8884d8" />
                        {/* <Bar dataKey="uv" name='2 คะแนน' fill="#82ca9d" /> */}
                    </BarChart>
                </ResponsiveContainer>

            </div>

        </>
    )
}