import { Config } from "@/app/Config/api.config"
import { useState } from "react"
import BtnSetting from "../../btnSetting"
import RotateCard from "../../rotateCard"
import ChangeImageGame2 from "./changeImage"
import ChangeProblemsGame2 from "./changeProblems"
import ChangeSoundGame2 from "./changeSound"

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
export default function MenuGame2(prop: Prop) {
    const [edit, setEdit] = useState<number>(0) // 1 = เปลี่ยนรูป, 2 = เปลี่ยนโจทย์, 3 = เปลี่ยนเสียง

    return (
        <div className="rounded-2xl w-full h-full flex flex-col items-center justify-center">

            {edit === 0 && (
                <div className=" gap-6">
                    <div className="my-6">
                        {prop.detail.map((detail) => (
                            <div key={detail.url} className="w-full flex justify-center">
                                {detail.position === "Card" && (
                                    // <img
                                    //     src={Config.url + detail.url}
                                    //     alt="Card Back"
                                    //     className="object-cover rounded-2xl"
                                    // />
                                    <RotateCard Back={Config.image + detail.url} />
                                )}
                            </div>
                        ))}



                    </div>

                    <div className="w-full flex justify-center gap-2">
                            <div className=" flex justify-center gap-2">
                                    <div onClick={e => setEdit(1)} className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                                        <BtnSetting name={'เปลี่ยนรูป'} />
                                    </div>

                                    <div  onClick={e => setEdit(2)} className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                                        <BtnSetting name={'เปลี่ยนโจทย์'} />
                                    </div>

                                    <div onClick={e => setEdit(3)} className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                                        <BtnSetting name={'เปลี่ยนเสียง'} />
                                    </div>
                            </div>
                    </div>
                </div>
            )}

            {edit === 1 && (
                <ChangeImageGame2 detail={prop.detail} setEdit={setEdit} />
            )}
            {edit === 2 && (
                <ChangeProblemsGame2 detail={prop.detail} setEdit={setEdit} />
            )}
            {edit === 3 && (
                <ChangeSoundGame2 detail={prop.detail} setEdit={setEdit} />
            )}

        </div>
    )
}