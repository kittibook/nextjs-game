import { getAuth } from "@/app/Services/api.service";
import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
export default function UserChart({ dataSetId }: Prop) {

    const [data, setData] = useState<Data[] | []>([])
    useEffect(() => {
        fetchData()
    }, [dataSetId])

    const fetchData = async () => {
        try {
            const res = await getAuth('/admin/analyze/user/' + dataSetId)
            console.log(res)
            if (res.success) {
                let newData = res.data as Data[]
                if (newData.length === 1) {
                    const start: Data = {
                        DatasetId: 0,
                        DatasetName: "",
                        userF: 0,
                        userM: 0
                    }
                    newData = [start, ...newData]
                    const end: Data = {
                        DatasetId: 0,
                        DatasetName: "",
                        userF: 0,
                        userM: 0
                    }
                    newData = [...newData, end]
                }

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
                    <h3 className="text-sm text-slate-500">
                        วันที่ 1 ธันวาคม  2567 - 25 มกราคม 2568
                    </h3>
                </div>

                <button className="text-sm  bg-btn-dashboard border border-main-2 rounded p-2 text-main">View Report</button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="DatasetName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="userM"
                        name="ชาย"
                        stroke="#8884d8"
                    />
                    <Line
                        type="monotone"
                        dataKey="userF"
                        name="หญิง"
                        stroke="#82ca9d"
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}