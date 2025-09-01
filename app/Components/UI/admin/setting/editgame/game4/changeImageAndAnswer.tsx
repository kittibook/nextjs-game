import { useEffect, useState } from "react";
import BtnSetting from "../../btnSetting";
import { Config } from "@/app/Config/api.config";
import { putAuthFormData } from "@/app/Services/api.service";
import { Bounce, toast } from "react-toastify";

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
export default function PointImageAndAnswerGame4(prop: Prop) {
    // console.log(prop.detail)\
    const [ImageUrl, setImageUrl] = useState<string>("/image")
    const [File, setFile] = useState<File | null>(null);
    const [edit, setEdit] = useState<number>(0) // 1 = แก้รูป, 2 = แก้คำตอบ
    const [answer, setAnswer] = useState<string>('');


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setImageUrl(Config.image + prop.detail.url)
        setAnswer(prop.detail.answer)
        setFile(null)
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const reset = () => {
        setEdit(0);
        fetchData()
    }

    const submit = async () => {
        try {
            const formdata = new FormData()
            if (File) {
                formdata.append('file', File)
            }

            formdata.append('setting', prop.detail.SettingGameDetail_id.toString())
            formdata.append('position', prop.detail.position)
            formdata.append('answer', answer)

            const res = await putAuthFormData('/admin/setting/sound-match-setting', formdata)
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
    return (
        <>
            <div className="rounded-2xl w-full h-full flex flex-col items-center justify-center">

                <div className="flex flex-col items-center gap-2">
                    <img
                        src={ImageUrl}
                        alt="Card Back"
                        className="w-[70%] h-[70%] object-cover rounded-2xl"
                    />

                    {edit === 0 && (
                        <div className=" flex justify-center gap-2" >
                            <div onClick={e => setEdit(1)} className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                                <BtnSetting name={'แก้ไขรูป'} />
                            </div>

                            <div onClick={e => setEdit(2)} className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                                <BtnSetting name={'แก้ไขคำตอบ'} />
                            </div>
                        </div>
                    )}

                    {edit === 1 && (
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
                                    className=" w-full"
                                    onChange={handleChange}
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

                                <div onClick={submit} className={`px-4 py-2 bg-green-400/20 transition delay-100 hover:bg-green-400/50 relative ${File ? 'flex fade-up-in' : 'hidden'}`}>
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







                </div>
            </div>
        </>
    )
}