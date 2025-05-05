import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function ScoreChart() {

    const data03 = [
        {
            "name": "วาดหกเหลี่ยม",
            "uv": 4,
            "pv": 2
        },
        {
            "name": "จับคู่สี",
            "uv": 3,
            "pv": 1
        },
        {
            "name": "จับคู่เลข",
            "uv": 2,
            "pv": 3
        },
        {
            "name": "รูปสัตว์",
            "uv": 3,
            "pv": 2
        },
        {
            "name": "เสียงสัตว์",
            "uv": 2,
            "pv": 2
        },
        {
            "name": "เสียงธรรมชาติ",
            "uv": 4,
            "pv": 5
        },
    ]

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
                    <BarChart width={730} height={250} data={data03}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" name='1 คะแนน' fill="#8884d8" />
                        <Bar dataKey="uv" name='2 คะแนน' fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

            </div>

        </>
    )
}