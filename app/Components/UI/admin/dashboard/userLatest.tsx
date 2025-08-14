import { getAuth } from "@/app/Services/api.service"
import { useEffect, useState } from "react"

interface User {
    DatasetId: number
    Positionid: number
    User_id: number
    age: number
    createdAt: string
    disease: string
    name: string
    score: string
    time: string
}

export default function () {
    const [data, setData] = useState<User[] | []>([])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await getAuth('/admin/dashboard/userlatest')
            if (res.success) {

                setData(res.user)
                // console.log(res)
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-700">
                        ผู้เข้าร่วมประเมินล่าสุด
                    </h2>
                    <h3 className="text-sm text-slate-500">
                        ผู้เข้าร่วมประเมินล่าสุด 5 ลำดับ
                    </h3>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center w-full space-y-4 h-64 overflow-auto">
                {data.map((v, i) => (
                    <div key={i} className="flex  items-center w-full text-lg border border-main-2 p-2 rounded-lg ">
                        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                        <div className="mx-5"> {v.name}</div>
                        <div className="mx-5"> {v.score} คะแนน</div>
                    </div>
                ))}

            </div>
        </>
    )
}