'use client'

import { Config } from "@/app/Config/api.config"
import BtnSetting from "../../btnSetting"
import { useEffect, useRef, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { putAuthFormData } from "@/app/Services/api.service";
import { FaVolumeUp } from "react-icons/fa";

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
export default function ChangeSoundGame2(prop: Prop) {

    const [File, setFile] = useState<File | null>(null);
    const [detail, setDetail] = useState<Detail | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isPlaying = useRef(false);
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        prop.detail.map((detail) => {
            if (detail.position === "Sound") {
                setDetail(detail)
            }
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFile(file);
        }
    };

    const submit = async () => {
        try {
            console.log(detail)
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

            const res = await putAuthFormData('/admin/setting/card-match-setting', fromData)
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
            }else {
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


    const playAudio = (audioUrl: string) => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audioUrl);
            audioRef.current.muted = false;
            audioRef.current.volume = 1;
        }

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            isPlaying.current = false;
        }

        audioRef.current.src = audioUrl;
        isPlaying.current = true;
        audioRef.current.play().catch((error) => {
            isPlaying.current = false;
        });

        audioRef.current.onended = () => {
            isPlaying.current = false;
        };
    };

    return (
        <>
            <div className="flex flex-col  gap-6">
                <div className="flex flex-col gap-2">
                    <div className="w-full flex justify-center">
                        <FaVolumeUp
                            onClick={e => playAudio(Config.image + detail?.url)}
                            className="text-blue-500 text-lg md:text-2xl w-48 h-48"
                        />
                    </div>


                    <div >
                        <div className="text-xs md:text-sm lg:text-xl">แนปไฟล์เสียง</div>
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
                                accept="audio/*"
                                className=" w-full"
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