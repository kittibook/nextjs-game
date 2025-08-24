'use client'

import { Config } from "@/app/Config/api.config"
import BtnSetting from "../../btnSetting"
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { putAuthFormData } from "@/app/Services/api.service";

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
export default function ChangeImageGame1(prop: Prop) {

    const [File, setFile] = useState<File | null>(null);
    const [ImageUrl, setImageUrl] = useState<string>('/');
    const [detail, setDetail] = useState<Detail | null>(null);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        prop.detail.map((detail) => {
            if (detail.position === "ImageDemo") {
                setDetail(detail)
                setImageUrl(Config.url + detail.url)
            }
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const submit = async () => {
        try {
            if (!detail) {
                return toast.warn('ไม่พบข้อมูล !!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
            if (!File) {
                return toast.warn('ไม่พบไฟล์รูปข้อมูล !!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }

            const fromData = new FormData()

            fromData.append('setting', detail.SettingGameDetail_id.toString());
            fromData.append('position', detail.position);
            fromData.append('image', File);

            const res = await putAuthFormData('/admin/setting/draw-setting', fromData)
            if (res.success) {
                toast.success('แก้ไขสำเร็จ !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setTimeout(() => window.location.reload(), 600);
            } else {
                toast.warn('เกิดข้อผิดพลาด', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }

        } catch (error) {

        }
    }



    return (
        <>
            <div className="flex flex-col  gap-6">
                <div className="flex flex-col gap-2">
                    <img
                        src={ImageUrl}
                        alt="Card Back"
                        className="w-full h-full object-cover rounded-2xl"
                    />

                    <div >
                        <div className="text-xs md:text-sm lg:text-xl">แนปไฟล์รูป</div>
                        <div className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                            <div className="w-2 h-1 bg-main absolute top-0 right-0"></div>
                            <div className="w-2 h-1 bg-main absolute bottom-0 right-0"></div>
                            <div className="w-2 h-1 bg-main absolute top-0 left-0"></div>
                            <div className="w-2 h-1 bg-main absolute bottom-0 left-0"></div>
                            <div className="w-1 h-2 bg-main absolute top-0 right-0"></div>
                            <div className="w-1 h-2 bg-main absolute bottom-0 right-0"></div>
                            <div className="w-1 h-2 bg-main absolute top-0 left-0"></div>
                            <div className="w-1 h-2 bg-main absolute bottom-0 left-0"></div>
                            <input
                                type="file"
                                accept="image/*"
                                className=""
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                </div>

                <div className="w-full flex justify-center gap-2">
                    <div key={0} onClick={e => prop.setEdit(0)} className="px-4 py-2 bg-red-400/20 transition delay-100 hover:bg-red-400/50 relative">
                        <div className="w-2 h-1 bg-red-400 absolute top-0 right-0"></div>
                        <div className="w-2 h-1 bg-red-400 absolute bottom-0 right-0"></div>
                        <div className="w-2 h-1 bg-red-400 absolute top-0 left-0"></div>
                        <div className="w-2 h-1 bg-red-400 absolute bottom-0 left-0"></div>
                        <div className="w-1 h-2 bg-red-400 absolute top-0 right-0"></div>
                        <div className="w-1 h-2 bg-red-400 absolute bottom-0 right-0"></div>
                        <div className="w-1 h-2 bg-red-400 absolute top-0 left-0"></div>
                        <div className="w-1 h-2 bg-red-400 absolute bottom-0 left-0"></div>
                        <p className="text-xs lg:text-xl">ยกเลิก</p>
                    </div>

                    <div key={1} onClick={submit} className={`px-4 py-2 bg-green-400/20 transition delay-100 hover:bg-green-400/50 relative ${File ? 'flex fade-up-in' : 'hidden'}`}>
                        <div className="w-2 h-1 bg-green-400 absolute top-0 right-0"></div>
                        <div className="w-2 h-1 bg-green-400 absolute bottom-0 right-0"></div>
                        <div className="w-2 h-1 bg-green-400 absolute top-0 left-0"></div>
                        <div className="w-2 h-1 bg-green-400 absolute bottom-0 left-0"></div>
                        <div className="w-1 h-2 bg-green-400 absolute top-0 right-0"></div>
                        <div className="w-1 h-2 bg-green-400 absolute bottom-0 right-0"></div>
                        <div className="w-1 h-2 bg-green-400 absolute top-0 left-0"></div>
                        <div className="w-1 h-2 bg-green-400 absolute bottom-0 left-0"></div>
                        <p className="text-xs lg:text-xl">ยืนยัน</p>
                    </div>
                </div>
            </div>
        </>
    )
}