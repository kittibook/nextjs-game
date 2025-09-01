import { Config } from "@/app/Config/api.config";
import { useEffect, useState } from "react";
import RotateCard from "../../rotateCard";
import { putAuthFormData } from "@/app/Services/api.service";
import { Bounce, toast } from "react-toastify";


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
export default function ChangeProblemsGame3(prop: Prop) {
    const [problems, setProblems] = useState<string[] | []>([]);
    const [imageUrl, setImageUrl] = useState<string>('/');
    const [detail, setDetail] = useState<Detail | null>(null);


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        prop.detail.map((detail) => {
            if (detail.position === "Card") {
                setDetail(detail)
                console.log(detail)

                setProblems(JSON.parse(detail.problems))
                setImageUrl(Config.image + detail.url)
            }
        })
    }


    const submit = async () => {
        try {
            if (!detail || problems.length <= 0) {
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


            const fromData = new FormData()

            fromData.append('setting', detail.SettingGameDetail_id.toString());
            fromData.append('position', detail.position);
            fromData.append('problems', JSON.stringify(problems));

            const res = await putAuthFormData('/admin/setting/card-match-setting-problems', fromData)
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

    const handleChange = (index: number, color: string) => {
        setProblems(prev => prev.map((c, i) => i === index ? color : c))
    }


    return (
        <>
            <div className="flex flex-col  gap-6">
                <div className="flex flex-col gap-2">

                    {problems.length > 0 && (
                        <div className="flex gap-2 ">

                                <RotateCard  NumFront={problems[0]} Back={imageUrl} />
                        </div>
                    )}

                    <div >
                        <div className="text-xs md:text-sm lg:text-xl"></div>
                        {problems.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 w-full justify-center">
                                {problems.map((problems, index) => (

                                    <div key={index} className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
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
                                            className=" w-full"
                                            value={problems}
                                        onChange={e => handleChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}


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