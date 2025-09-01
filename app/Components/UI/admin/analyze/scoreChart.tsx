import { getAuth } from "@/app/Services/api.service";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Prop {
    dataSetId: number | null
}

interface Score {
    name: string, 
    average: number
}
export default function ScoreChart({ dataSetId }: Prop) {
    const [score, setScore] = useState<Score[] | []>([])

    useEffect(() => {
        fetchData()
    }, [dataSetId])

    const fetchData = async () => {
        try {
            const res = await getAuth('/admin/analyze/score/' + dataSetId)
            if (res.success) {
                // console.log(res)
                setScore(res.averages)
            }
        } catch (error) {

        }
    }

    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-700">
                        ค่าเฉลี่ยการได้คะแนนจากเกม
                    </h2>
                </div>
            </div>
            <div className="flex justify-between items-center w-full">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart width={730} height={250} data={score}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" name='ค่าเฉลี่ย' fill="#8884d8" />
                        {/* <Bar dataKey="uv" name='2 คะแนน' fill="#82ca9d" /> */}
                    </BarChart>
                </ResponsiveContainer>

            </div>

        </>
    )
}