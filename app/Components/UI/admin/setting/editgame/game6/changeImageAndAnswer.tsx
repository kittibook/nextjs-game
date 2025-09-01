"use client";
import { useEffect, useRef, useState } from "react";
import BtnSetting from "../../btnSetting";
import { Config } from "@/app/Config/api.config";
import { putAuthFormData } from "@/app/Services/api.service";
import { Bounce, toast } from "react-toastify";
import { FaVolumeUp } from "react-icons/fa";

interface Prop {
    detail: Detail
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
export default function PointImageAndAnswerGame6(prop: Prop) {
    // console.log(prop.detail)\
    const [sound, setSound] = useState<File | null>(null);
    const [edit, setEdit] = useState<number>(0) // 1 = แก้รูป, 2 = แก้คำตอบ
    const [answer, setAnswer] = useState<string>('');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isPlaying = useRef(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setAnswer(prop.detail.answer)
    }

    const handleChangeSound = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSound(file);
        }
    };

    const reset = () => {
        setEdit(0);
        fetchData()
    }

    const submit = async () => {
        try {
            const formdata = new FormData()

            if (sound) {
                formdata.append('image', sound)
            }

            formdata.append('setting', prop.detail.SettingGameDetail_id.toString())
            formdata.append('position', prop.detail.position)
            formdata.append('answer', answer)

            const res = await putAuthFormData('/admin/setting/sound-image-match-setting', formdata)
            console.log(res)
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
            <div className="rounded-2xl w-full h-full flex flex-col items-center justify-center">

                <div className="flex flex-col items-center gap-2">
                    <div className="w-full flex justify-center">
                        <FaVolumeUp
                            onClick={e => playAudio(Config.image + prop.detail.url)}
                            className="text-blue-500  text-lg md:text-2xl w-48 h-48"
                        />
                    </div>


                    {edit === 0 && (
                        <div className=" flex justify-center gap-2" >

                            <div onClick={e => setEdit(2)} className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                                <BtnSetting name={'แก้ไขคำตอบ'} />
                            </div>

                            <div onClick={e => setEdit(3)} className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                                <BtnSetting name={'แก้ไขเสียงคำถาม'} />
                            </div>
                        </div>
                    )}


                    {edit === 2 && (
                        <div >
                            <div className="text-xs md:text-sm lg:text-xl">กรอกคำตอบ</div>
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
                                    type="text"
                                    className="w-full h-full"
                                    value={answer}
                                    onChange={e => setAnswer(e.target.value)}
                                />
                            </div>

                            <div className="w-full flex justify-center gap-2 my-5">
                                <div onClick={reset} className="px-4 py-2 bg-red-400/20 transition delay-100 hover:bg-red-400/50 relative">
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

                                <div onClick={submit} className={`px-4 py-2 bg-green-400/20 transition delay-100 hover:bg-green-400/50 relative flex fade-up-in`}>
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
                    )}


                    {edit === 3 && (
                        <div>


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
                                        className=""
                                        onChange={handleChangeSound}
                                    />
                                </div>
                            </div>


                            <div className="w-full flex justify-center gap-2 my-5">
                                <div key={0} onClick={e => setEdit(0)} className="px-4 py-2 bg-red-400/20 transition delay-100 hover:bg-red-400/50 relative">
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

                                <div key={1} onClick={submit} className={`px-4 py-2 bg-green-400/20 transition delay-100 hover:bg-green-400/50 relative ${sound ? 'flex fade-up-in' : 'hidden'}`}>
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
                    )}






                </div>
            </div>
        </>
    )
}