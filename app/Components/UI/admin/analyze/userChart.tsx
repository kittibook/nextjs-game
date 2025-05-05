import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// กราฟ ผู้เข้าร่วมการประเมิน
// กราฟ ผู้เข้าร่วมการประเมิน
// กราฟ ผู้เข้าร่วมการประเมิน
// กราฟ ผู้เข้าร่วมการประเมิน
// กราฟ ผู้เข้าร่วมการประเมิน
// กราฟ ผู้เข้าร่วมการประเมิน

export default function UserChart() {
    const data = [
        {
            "name": "สัปดาห์ 1",
            "uv": 2,
            "pv": 1,
        },
        {
            "name": "สัปดาห์ 2",
            "uv": 1,
            "pv": 2,
        },
        {
            "name": "สัปดาห์ 3",
            "uv": 2,
            "pv": 2,
        },
        {
            "name": "สัปดาห์ 4",
            "uv": 4,
            "pv": 3,
        },
        {
            "name": "สัปดาห์ 5",
            "uv": 2,
            "pv": 4,
        },
        {
            "name": "สัปดาห์ 6",
            "uv": 2,
            "pv": 3,
        }
    ]
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
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="pv"
                        name="ชาย"
                        stroke="#8884d8"
                    />
                    <Line
                        type="monotone"
                        dataKey="uv"
                        name="หญิง"
                        stroke="#82ca9d"
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}