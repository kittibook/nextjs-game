"use client";
import { useState } from "react"
import BtnSetting from "../../btnSetting"
import RotateCard from "../../rotateCard"
import { FaQuestion } from "react-icons/fa"
import PointGame4 from "./changePoint"
import ChangeSoundGame4 from "./changeSound"

interface Prop {
    detail: Detail[]
}

interface Detail {
    SettingGameDetail_id: number
    SettingGameid: number
    answer: any
    createdAt: string
    position: string
    problems: any
    url: string
}
export default function MenuGame6(prop: Prop) {
    const [edit, setEdit] = useState<number>(0) // 2 = เปลี่ยนโจทย์, 3 = เปลี่ยนเสียง

    return (
        <div className="rounded-2xl w-full h-full flex flex-col items-center justify-center">

            {edit === 0 && (
                <div className="w-full grid grid-cols-2 gap-2">
                    <div onClick={e => setEdit(2)} className="px-4 py-2 h-64 flex justify-center items-center bg-main/20 transition delay-100 hover:bg-main/50 relative">
                        <BtnSetting name={'เปลี่ยนโจทย์'} />
                    </div>

                    <div onClick={e => setEdit(3)} className="px-4 py-2 h-64 flex justify-center items-center bg-main/20 transition delay-100 hover:bg-main/50 relative">
                        <BtnSetting name={'เปลี่ยนเสียง'} />
                    </div>
                </div>
            )}

            {edit === 2 && (
                <PointGame4 setEdit={setEdit} detail={prop.detail} />
            )}

            {edit === 3 && (
                <ChangeSoundGame4 detail={prop.detail} setEdit={setEdit} />
            )}


        </div>
    )
}