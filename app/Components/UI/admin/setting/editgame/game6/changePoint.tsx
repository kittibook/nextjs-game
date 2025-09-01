"use client";
import { useState } from "react";
import BtnSetting from "../../btnSetting";
import PointImageAndAnswerGame4 from "./changeImageAndAnswer";

interface Prop {
    detail: Detail[]
    setEdit: (value: number) => void;

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
export default function PointGame6(prop: Prop) {
    // console.log(prop.detail)
    const [edit, setEdit] = useState<number>(0) // 0 = หน้าหลัก, 1 = เปลี่ยน
    const [Detail, setDetail] = useState<Detail>(prop.detail[0]) // 0 = หน้าหลัก, 1 = เปลี่ยน

    const Editdetail = (detail: Detail) => {
        setEdit(1)
        setDetail(detail)
    }

    return (
        <>
            <div className=" w-full flex flex-col items-center justify-center">
                {edit === 0 && (
                    <div>
                        <h3 className=" text-lg lg:text-2xl my-5">เลือกโจทย์ที่ต้องการแก้ไข</h3>

                        <div className=" grid grid-cols-1 lg:flex lg:justify-center gap-2" >
                            {prop.detail.map((detail) => (
                                <div key={detail.SettingGameDetail_id}>
                                    {detail.position === "Point" && (
                                        <div key={detail.url} onClick={e => Editdetail(detail)} className="px-4 py-2 min-w-32 flex justify-center bg-main/20 transition delay-100 hover:bg-main/50 relative">
                                            <BtnSetting name={detail.answer} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className=" flex justify-center gap-2 my-5" >
                            <div onClick={e => prop.setEdit(0)} className="px-4 py-2 bg-red-400/20 transition delay-100 hover:bg-red-400/50 relative">
                                <div className="w-2 h-1 bg-red-400 absolute top-0 right-0"></div>
                                <div className="w-2 h-1 bg-red-400 absolute bottom-0 right-0"></div>
                                <div className="w-2 h-1 bg-red-400 absolute top-0 left-0"></div>
                                <div className="w-2 h-1 bg-red-400 absolute bottom-0 left-0"></div>
                                <div className="w-1 h-2 bg-red-400 absolute top-0 right-0"></div>
                                <div className="w-1 h-2 bg-red-400 absolute bottom-0 right-0"></div>
                                <div className="w-1 h-2 bg-red-400 absolute top-0 left-0"></div>
                                <div className="w-1 h-2 bg-red-400 absolute bottom-0 left-0"></div>
                                <p className="text-xs lg:text-xl">ย้อนกลับ</p>
                            </div>
                        </div>
                    </div>

                )}

                {edit === 1 && (
                    <PointImageAndAnswerGame4 detail={Detail} />
                )}



            </div>
        </>
    )
}