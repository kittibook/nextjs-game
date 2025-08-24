import { useState } from "react";
import BtnSetting from "../../btnSetting";
import { Config } from "@/app/Config/api.config";
import ChangeImageGame1 from "./changeImage";
import ChangeSoundGame1 from "./changeSound";

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


export default function MenuGame1(prop: Prop) {
    const [edit, setEdit] = useState<number>(0) // 1 = เปลี่ยนรูป, 2 = เปลี่ยนเสียง
    return (
        <div className="rounded-2xl w-full h-full flex flex-col items-center justify-center">

            {edit === 0 && (
                <div className=" gap-6">
                    <div className="my-6">
                        {prop.detail.map((detail) => (
                            <div key={detail.url}>
                                {detail.position === "ImageDemo" && (
                                    <img
                                        src={Config.url + detail.url}
                                        alt="Card Back"
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                )}
                            </div>
                        ))}



                    </div>

                    <div className="w-full flex justify-center gap-2">
                        {prop.detail.map((detail) => (
                            <div key={detail.SettingGameDetail_id}>
                                {detail.position === "ImageDemo" && (
                                    <div key={detail.position} onClick={e => setEdit(1)} className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                                        <BtnSetting name={'เปลี่ยนรูป'} />
                                    </div>
                                )}

                                {detail.position === "Sound" && (
                                    <div key={detail.position} onClick={e => setEdit(2)} className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                                        <BtnSetting name={'เปลี่ยนเสียง'} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {edit === 1 && (
                <ChangeImageGame1 detail={prop.detail} setEdit={setEdit} />
            )}

            {edit === 2 && (
                <ChangeSoundGame1 detail={prop.detail} setEdit={setEdit} />
            )}


        </div>


    )
}