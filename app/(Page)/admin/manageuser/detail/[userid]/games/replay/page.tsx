'use client'

import LayoutAdmin from "@/app/Components/Layout/admin/admin"
import LoadingOverlay from "@/app/Components/UI/admin/LoadingOverlay";
import { getAuth } from "@/app/Services/api.service";
import { Game, User } from "@/app/Types/admin";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { IoIosFastforward, IoIosPause, IoIosPlay, IoIosRewind } from "react-icons/io";
import ReplayGame1 from "@/app/Components/UI/admin/games/game1.component";
import ReplayGame2 from "@/app/Components/UI/admin/games/game2.component";
import ReplayGame3 from "@/app/Components/UI/admin/games/game3.component";


export default function UserDetailReplay() {

    const params = useParams()
    const router = useRouter();

    const decodeId = (encodedId: string) => {
        const id = decodeURIComponent(encodedId)
        return atob(id)
    };

    const [user, setUser] = useState<User | null>(null)
    const [game, setGame] = useState<Game[] | []>([])
    const [index, setIndex] = useState<number>(0)
    const [loading, setLoading] = useState(true);
    const [startTime, setStartTime] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true);
            if (!params.userid) {
                router.back()
                return;
            }
            const datasetId = decodeId(params.userid as string);
            const res = await getAuth('/admin/user/games/' + datasetId);
            console.log(res)
            if (res.success) {
                setGame(res.game)
                setUser(res.user)
                setLoading(false);
            }
        } catch (error) {
        }
    }

    const nextGame = async (type: string) => {
        if (type === 'back') {
            if (index <= 0) {
                setIndex(0)
                return
            }
            setIndex(index - 1)
        }

        if (type === 'next') {
            if (index >= 5) {
                setIndex(5)
                return
            }
            setIndex(index + 1)
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
                        <h1 className="text-lg font-medium text-[rgb(31,56,76)]">ประวัติการเล่นเกม</h1>

                    </div>
                    <div className="w-full flex justify-center mt-5">
                        <div className="p-4 w-[90%] bg-bgnavbar-2 rounded-2xl">
                            <div className="w-full flex justify-between">
                                <div className="w-1/2">
                                    <h1 className="text-sm lg:text-2xl">{user?.name}</h1>
                                </div>
                                <div className="w-1/2 flex justify-end gap-x-2">
                                    <h1 className="text-sm lg:text-2xl">คะแนนที่ทำได้ : </h1>
                                    <h1 className="text-sm lg:text-2xl font-bold">{game[index].score}</h1>
                                </div>
                            </div>

                            <div className="w-full flex justify-center my-5">
                                <div className="">
                                    <h1 className="text-xl lg:text-3xl font-bold">{game[index].name}</h1>
                                </div>
                            </div>

                            <div className="w-full flex justify-center my-5 gap-x-2">
                                {game[index].name !== "เกมวาดรูป 6 เหลี่ยม" && (
                                    <>
                                        <div onClick={e => setStartTime(true)} className="p-2 bg-green-200 hover:bg-green-400 rounded-xl">
                                            <IoIosPlay className="text-green-800 lg:w-10 lg:h-10" />
                                        </div>

                                        <div onClick={e => setStartTime(false)} className="p-2 bg-red-200 hover:bg-red-400 rounded-xl">
                                            <IoIosPause className="text-red-800 lg:w-10 lg:h-10" />
                                        </div>

                                        <div onClick={e => nextGame('back')} className="p-2 bg-blue-200 hover:bg-blue-400 rounded-xl">
                                            <IoIosRewind className="text-blue-800 lg:w-10 lg:h-10" />
                                        </div>
                                    </>
                                )}
                                <div onClick={e => nextGame('next')} className="p-2 bg-purple-200 hover:bg-purple-400 rounded-xl">
                                    <IoIosFastforward className="text-purple-800 lg:w-10 lg:h-10" />
                                </div>
                            </div>

                            {game[index].name === "เกมวาดรูป 6 เหลี่ยม" ? (
                                <ReplayGame1 detail={game[index].detail} />
                            ): game[index].name === "เกมจับคู่สี" ? (
                                <ReplayGame2
                                    setStartTime={setStartTime}
                                    startTime={startTime}
                                    game={game[index]}
                                    detail={game[index].detail}
                                />
                            ) : game[index].name === "เกมจับคู่เลข" ? (
                                <ReplayGame3
                                    setStartTime={setStartTime}
                                    startTime={startTime}
                                    game={game[index]}
                                    detail={game[index].detail}
                                />
                            ) : null}



                        </div>
                    </div>
                </div>
            }

        </LayoutAdmin>
    )
}