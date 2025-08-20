'use client'

import LayoutAdmin from "@/app/Components/Layout/admin/admin"
import { useParams } from "next/navigation";
import { IoChevronForward } from "react-icons/io5";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function UserDetail() {

    const params = useParams()
    
    const decodeId = (encodedId : string) => {
        const id = decodeURIComponent(encodedId)
        return atob(id)
    };
    
    const score = [
        {
            name: 'test001',
            average: 0
        },
        {
            name: 'test002',
            average: 2
        },
        {
            name: 'test003',
            average: 1
        }
    ]
    return (
        <LayoutAdmin>
            <div className="min-h-screen min-w-[100%] flex flex-col pt-15 pl-5 bg-gray-50">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-medium text-[rgb(31,56,76)]">จัดการข้อมูลผู้ใช้งาน</h1>
                    <IoChevronForward />
                    <h1 className="text-lg font-medium text-[rgb(31,56,76)]">รายละเอียด</h1>

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 w-full h-full">
                    <div className="col-span-1 transition-all duration-300 border-b lg:border-r border-[#C8CBD9] w-full  min-h-84 ">
                        <div className="flex justify-center items-center w-full h-full">
                            <div className=" flex flex-col gap-y-4">
                                <div className="flex">
                                    <h1 className="text-lg lg:text-5xl font-medium text-black">นาย กิตติพล อินมูล</h1>
                                </div>

                                <div className="flex gap-x-4 ">
                                    <h1 className="text-lg lg:text-3xl font-bold text-black/70">โรคประจำตัว</h1>
                                    <h1 className="text-lg lg:text-3xl font-bold text-black">ไม่มี</h1>
                                </div>

                                <div className="flex gap-x-4">
                                    <h1 className="text-lg lg:text-3xl font-bold text-black/70">อายุ</h1>
                                    <h1 className="text-lg lg:text-3xl font-bold text-black">21</h1>
                                </div>

                                <div className="flex gap-x-4">
                                    <h1 className="text-lg lg:text-3xl font-bold text-black/70">คะแนนที่ทำได้</h1>
                                    <h1 className="text-lg lg:text-3xl font-bold text-black">21</h1>
                                </div>

                                <div className="flex gap-x-4">
                                    <h1 className="text-lg lg:text-3xl font-bold text-black/70">เวลาเฉลี่ย</h1>
                                    <h1 className="text-lg lg:text-3xl font-bold text-black">1.2</h1>
                                    <h1 className="text-lg lg:text-3xl font-bold text-black">นาที</h1>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 transition-all duration-300 lg:border-r border-[#C8CBD9] w-full  min-h-84  border-b">
                        <div className="px-3">
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-semibold text-slate-700">
                                        การได้คะแนนจากเกม
                                    </h2>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={score} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="average"
                                            name="คะแนน"
                                            stroke="#8884d8"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>

                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 transition-all duration-300 lg:border-r border-[#C8CBD9] w-full  min-h-84  border-b lg:border-b-0">
                        <div className="p-3">
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-semibold text-slate-700">
                                        คะแนนที่ทำได้ในแต่ละเกม
                                    </h2>
                                </div>
                            </div>
                            <div className="flex justify-center items-center w-full">
                                <div className="w-[90%]">
                                    <div className=" ">
                                        <div className="flex justify-between items-center gap-x-4 border-b border-[#C8CBD9] w-full hover:bg-main/20 p-2 hover:rounded-2xl">
                                            <div>
                                                <h1 className="text-lg lg:text-3xl font-medium text-main">เกมวาดรูป 6 เหลี่ยม</h1>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <h1 className="text-lg lg:text-3xl font-medium text-main"> 2 คะแนน</h1>
                                                <h1 className="text-sm lg:text-lg font-medium text-main/70">เวลาที่ใช้  2.6 นาที</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </LayoutAdmin>
    )
}