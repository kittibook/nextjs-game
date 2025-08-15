'use client'

import { getAuth } from "@/app/Services/api.service"
import { useEffect, useState } from "react"


interface Props { 
    dataSetId: number | null 
}

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

export default function ({ dataSetId } : Props) {
    const [data, setData] = useState<User[] | []>([])
        useEffect(() => {
            fetchData()
        }, [dataSetId])
    
        const fetchData = async () => {
            try {
                const res = await getAuth('/admin/analyze/userlatest/' + dataSetId)
                if (res.success) {
                    setData(res.user)
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
                    <div key={i} className="flex justify-between w-full items-center text-lg h-16 border border-main-2 p-2 rounded-lg ">
                        {/* <div className=" h-16 rounded-full "></div> */}
                        <div className="mx-5 h-16 flex items-center">{v.name}</div>
                        <div className="mx-5"> {v.score} คะแนน</div>
                    </div>
                ))}

            </div>
        </>
    )
}