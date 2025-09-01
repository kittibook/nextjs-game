'use client'

import LayoutAdmin from "@/app/Components/Layout/admin/admin"
import LoadingOverlay from "@/app/Components/UI/admin/LoadingOverlay";
import { getAuth } from "@/app/Services/api.service";
import { Game, User } from "@/app/Types/admin";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function UserDetail() {

    const params = useParams()
    const router = useRouter();
    const pathname = usePathname()

    const decodeId = (encodedId: string) => {
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

    const [user, setUser] = useState<User | null>(null)
    const [game, setGame] = useState<Game[] | []>([])
    const [loading, setLoading] = useState(true);
    const [criterion, setcCiterion] = useState<number>(0)

    useEffect(() => {
        fetchData()
        fetchCriterion()
    }, [])

    const fetchCriterion = async () => {
        try {
            const res = await getAuth('/admin/user/criterion')
            if (res.success) {
                setcCiterion(res.criterion)
            }
        } catch (error) {
        }
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            if (!params.userid) {
                router.back()
                // console.warn("ไม่มี userid");
                return;
            }
            const datasetId = decodeId(params.userid as string);
            const res = await getAuth('/admin/user/detail/' + datasetId);
            if (res.success) {
                setGame(res.game)
                setUser(res.user)
                setLoading(false);
            }
            // console.log(" response:", res);
        } catch (error) {
            // console.error("fetchData error:", error);
        }
    }


    return (
        <LayoutAdmin>
            {loading ?
                <LoadingOverlay />

                :

                <div className="min-h-screen min-w-[100%] flex flex-col pt-15 pl-5 bg-gray-50">
                    <div onClick={e => router.back()} className="flex items-center gap-2">
                        <h1 className="text-lg font-medium text-[rgb(31,56,76)]">จัดการข้อมูลผู้ใช้งาน</h1>
                        <IoChevronForward />
                        <h1 className="text-lg font-medium text-[rgb(31,56,76)]">รายละเอียด</h1>

                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 w-full h-full">

                        <div className="col-span-1 transition-all duration-300 border-b lg:border-r border-[#C8CBD9] w-full  min-h-84 ">
                            <div className="flex justify-center items-center w-full h-full">
                                <div className=" flex flex-col gap-y-4 ">
                                    <div className="flex w-full justify-center">
                                        <h1 className="text-lg lg:text-5xl font-medium text-black">{user?.name}</h1>
                                    </div>

                                    <div className="flex gap-x-4 ">
                                        <h1 className="text-lg lg:text-2xl font-bold text-black/70">โรคประจำตัว</h1>
                                        <h1 className="text-lg lg:text-2xl font-bold text-black">{user?.disease}</h1>
                                    </div>

                                    <div className="flex gap-x-4">
                                        <h1 className="text-lg lg:text-2xl font-bold text-black/70">อายุ</h1>
                                        <h1 className="text-lg lg:text-2xl font-bold text-black">{user?.age}</h1>
                                    </div>

                                    <div className="flex gap-x-4">
                                        <h1 className="text-lg lg:text-2xl font-bold text-black/70">คะแนนที่ทำได้</h1>
                                        <h1 className="text-lg lg:text-2xl font-bold text-black">{user?.score}</h1>
                                    </div>

                                    <div className="flex gap-x-4">
                                        <h1 className="text-lg lg:text-2xl font-bold text-black/70">MCI</h1>
                                        {Number(user?.score) >= criterion ? <p className="p-2 bg-green-200 rounded-2xl text-center">ไม่เป็น MCI</p> : <p className="p-2 bg-red-200 rounded-2xl text-center">เป็น MCI</p>}

                                    </div>


                                    <div className="flex gap-x-4">
                                        <h1 className="text-lg lg:text-2xl font-bold text-black/70">เวลาเฉลี่ย</h1>
                                        <h1 className="text-lg lg:text-2xl font-bold text-black">{user?.time}</h1>
                                        <h1 className="text-lg lg:text-2xl font-bold text-black">นาที</h1>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div className="col-span-1  transition-all duration-300 lg:border-r border-[#C8CBD9] w-full  min-h-84  border-b ">
                            <div className="p-3">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex flex-col">
                                        <h2 className="text-2xl font-semibold text-slate-700">
                                            ผลการประเมิน
                                        </h2>
                                    </div>
                                    {/* <button className="text-sm  bg-btn-dashboard border border-main-2 rounded p-2 text-main hover:bg-main hover:text-btn-dashboard">ดูการเล่นเกม</button> */}
                                </div>
                                <div className="flex justify-center items-center w-full">
                                    { Number(user?.score) >= criterion ? <div className="p-2 bg-green-200 w-64 h-64 rounded-full flex justify-center items-center text-5xl font-bold">ไม่เป็น MCI</div> : <div className="p-2 bg-red-200 w-64 h-64 rounded-full flex justify-center items-center text-5xl font-bold">เป็น MCI</div>}
                                </div>
                            </div>
                        </div>




                        <div className="col-span-1 transition-all duration-300 lg:border-r border-[#C8CBD9] lg:border-b-0 w-full  min-h-84  border-b">
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
                                        <LineChart data={game} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="score"
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
                                        <h2 className="text-2xl font-semibold text-slate-700">
                                            คะแนนที่ทำได้ในแต่ละเกม
                                        </h2>
                                    </div>
                                    <button onClick={e => router.push(pathname + '/games/replay')} className="text-sm  bg-btn-dashboard border border-main-2 rounded p-2 text-main hover:bg-main hover:text-btn-dashboard">ดูการเล่นเกม</button>
                                </div>
                                <div className="flex justify-center items-center w-full">
                                    <div className="w-[90%]">
                                        {game.length > 0 && (
                                            <>{game.map((game) => (
                                                <div key={game.Game_id} className="flex justify-between items-center gap-x-4 border-b border-[#C8CBD9] w-full hover:bg-main/20 p-2 hover:rounded-2xl">
                                                    <div>
                                                        <h1 className="text-lg lg:text-3xl font-medium text-main">{game.name}</h1>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <h1 className="text-lg lg:text-3xl font-medium text-main"> {game.score} คะแนน</h1>
                                                        <h1 className="text-sm lg:text-lg font-medium text-main/70">เวลาที่ใช้  {game.time} นาที</h1>
                                                    </div>
                                                </div>
                                            ))}</>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            }

        </LayoutAdmin>
    )
}