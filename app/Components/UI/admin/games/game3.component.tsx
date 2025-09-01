'use client';

import { Config } from "@/app/Config/api.config";
import { useEffect, useState } from "react";
import "@/app/Styles/Game/gamenumber.styles.css";
import { Game } from "@/app/Types/admin";
import { getAuth } from "@/app/Services/api.service";
import LoadingOverlay from "../LoadingOverlay";

interface Prop {
    detail: any
    game: Game
    startTime: boolean
    setStartTime: React.Dispatch<React.SetStateAction<boolean>>
}


export default function ReplayGame3(props: Prop) {

    const [startTime, setSetartTime] = useState<number>(0)
    const [problems, setProblems] = useState<any[]>([])
    const [setting, setSetting] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const [answer, setAnswer] = useState<any>([])

    useEffect(() => {
        fetchData()
        fetchsetting()
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (props.startTime) {
            interval = setInterval(() => {
                setSetartTime((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [props.startTime]);

    const fetchData = async () => {
        console.log('props : ', props)
        console.log('startTime : ', props.detail[0].detail[0].time)

        setSetartTime(Number(props.detail[0].detail[0].time) - 1)

        const pr = props.game.problems.map((value: any, key: number) => {
            return { id: key, number: value, flipped: false }
        })
        setProblems(pr)
        let newAw: any[] = []
        props.detail.map((game: any) => {
            game.detail.map((detail: any) => {
                newAw.push(detail)
            })
        })

        setAnswer(newAw)


    }


    const fetchsetting = async () => {
        try {
            const res = await getAuth('/admin/setting')
            if (res.success) {
                res.Setting.map((value: any) => {
                    if (value.name === "game2") {
                        value.SettingGameDetail.map((datail: any) => {
                            if (datail.position === "Card") {
                                setSetting(datail)
                                setLoading(false)
                            }

                        })
                    }
                })
            }
        } catch {

        }
    }

    useEffect(() => {
        answer.forEach((value: any) => {
            if (startTime === value.time) {
                const index = problems.findIndex(
                    (p: any) => p.number === value.number && !p.flipped
                )

                if (index !== -1) {
                    const newProblems = [...problems]

                    newProblems[index] = {
                        ...newProblems[index],
                        flipped: true,
                    }

                    setProblems(newProblems)
                }
            }
        })

    }, [startTime])

    useEffect(() => {
        const flipped: any[] = problems.filter((v) => v.flipped === true)
        if (flipped.length === problems.length) {
            props.setStartTime(false)
        }
    }, [problems])



    return (
        <div>
            {loading ?
                <LoadingOverlay />

                :
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full my-3 flex justify-center ">
                        เวลา : {startTime}
                    </div>

                    <div className="w-full h-full bg-fixed  bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl">
                        <div className="game3 flex flex-col items-center w-full pt-10">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 p-6">
                                {problems.map((card: any, index: any) => (
                                    <div
                                        key={index}
                                        className={`w-[150px] h-[200px] cursor-pointer card ${card.flipped || card.matched ? "flipped" : ""
                                            }`}
                                    >
                                        <div className="card-inner">
                                            <div
                                                className={`card-front bg-white text-9xl font-bold font-mali text-blue-500`}
                                            >
                                                {card.number}
                                            </div>
                                            <div className="card-back">
                                                <img
                                                    src={Config.image + setting.url}

                                                    alt="Card Back"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

