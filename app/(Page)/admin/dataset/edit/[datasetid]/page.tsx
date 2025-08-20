"use client"
import LayoutAdmin from "@/app/Components/Layout/admin/admin";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs'
import ProgressBarDataSet from "@/app/Components/UI/admin/dataset/ProgressBar.dataset";
import { FormStepDataSet } from "@/app/Components/UI/admin/dataset/FormStep.dataset";
import { PreviewCard } from "@/app/Components/UI/admin/dataset/PreviewCard.dataset";
import { Bounce, toast } from "react-toastify";
import { getAuth, postAuth, putAuth } from "@/app/Services/api.service";
import { useParams, useRouter } from "next/navigation";

export default function DataSetCreate() {
    const [level, setLevel] = useState<number>(1)
    const [name, setName] = useState<string>("")
    const [detail, setDetail] = useState<string>("")
    const [datedefault, setDateDefault] = useState<Dayjs | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const router = useRouter();
    const params = useParams()

    const decodeId = (encodedId : string) => {
        const id = decodeURIComponent(encodedId)
        return atob(id)
    };

    const fetchLocationFromStorage = () => {
        const lat = localStorage.getItem('latitude');
        const lng = localStorage.getItem('longitude');

        if (lat && lng) {
            setLatitude(parseFloat(lat));
            setLongitude(parseFloat(lng));
        }
    };


    const nextLevel = (e: React.FormEvent) => {
        e.preventDefault();
        if (level > 4) return
        setLevel(level + 1)
    };

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            if (!params.datasetid) return
            const id = decodeId(params.datasetid as string);
            const res = await getAuth('/admin/dataset/' + id)
            if (res.success) {
                const ds = res.dataSet as {
                    Dataset_id: number
                    Name: string
                    details: string
                    dateStart?: string | null
                    dateEnd?: string | null
                    Position: {
                        latitude?: number | string | null
                        longitude?: number | string | null
                    }
                    isdel?: 'active' | 'inactive'
                    status?: 'active' | 'inactive'
                }

                setName(ds.Name ?? "")
                setDetail(ds.details ?? "")

                const s = dayjs(ds.dateStart)
                const e = dayjs(ds.dateEnd)
                setStartDate(s)
                setEndDate(e)
                setDateDefault(s)

                const lat = typeof ds.Position.latitude === 'string' ? parseFloat(ds.Position.latitude) : ds.Position.latitude ?? null
                const lng = typeof ds.Position.longitude === 'string' ? parseFloat(ds.Position.longitude) : ds.Position.longitude ?? null
                setLatitude(Number.isFinite(lat as number) ? (lat as number) : null)
                setLongitude(Number.isFinite(lng as number) ? (lng as number) : null)
            }
        } catch (error) {
            console.error(error)
        }
    }


    const edit = async () => {
        try {
            if (name === "" || detail === "" || startDate === null || endDate === null || latitude === null || longitude === null) {
                return toast.warn('ข้อมูลไม่ครบถ้วน', {
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

            const body = {
                Name: name,
                details: detail,
                dateStart: startDate,
                dateEnd: endDate,
                Position: {
                    latitude: latitude.toString(),
                    longitude: longitude.toString()
                }
            }
            const res = await putAuth('/admin/dataset/' + params.datasetid, body)

            if (res.success) {
                toast.success('สร้างสำเร็จ', {
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
                router.push('/admin/dataset')
            }

        } catch (error) {

        }
    }


    return (
        <LayoutAdmin>
            <div className="min-h-screen w-full flex flex-col bg-gray-50">
                <div className="flex justify-between items-center p-16 ">
                    <h1 className="text-lg font-medium text-[#1F384C]">แก้ไขชุดข้อมูล </h1>
                </div>
                <div className="flex justify-center items-center w-full ">
                    <div className={`${level > 4 ? "flex justify-center items-center bg-linear-to-b from-main/20" : ""} w-[90%] bg-bgnavbar-2 rounded-2xl flex`}>
                        <div className=" w-full lg:w-[50%] ">
                            <div className="m-5 flex justify-between"> </div>
                            <div className=" mx-5 px-20">
                                <ProgressBarDataSet level={level} />

                                <div className="my-10 w-full flex justify-center items-center">
                                    <div className="text-2xl">สร้างชุดข้อมูล</div>
                                </div>
                                <form onSubmit={nextLevel}>
                                    <FormStepDataSet
                                        level={level} // กำหนดระดับขั้นตอน
                                        name={name} // ชื่อชุดข้อมูล
                                        detail={detail} // รายละเอียดชุดข้อมูล
                                        setName={setName} // ฟังก์ชันตั้งชื่อชุดข้อมูล
                                        setDetail={setDetail} // ฟังก์ชันตั้งรายละเอียดชุดข้อมูล
                                        fetchLocationFromStorage={fetchLocationFromStorage} // ฟังก์ชันดึงตำแหน่งจาก localStorage
                                        startDate={startDate} // วันที่เริ่มต้น
                                        endDate={endDate} // วันที่สิ้นสุด
                                        setStartDate={setStartDate} // ฟังก์ชันตั้งวันที่เริ่มต้น
                                        setEndDate={setEndDate} // ฟังก์ชันตั้งวันที่สิ้นสุด
                                    />

                                    {level > 4 ? (
                                        <>
                                            <PreviewCard
                                                name={name}
                                                detail={detail}
                                                dateStart={startDate}
                                                dateEnd={endDate}
                                                datedefault={datedefault}
                                                latitude={latitude}
                                                longitude={longitude}
                                            />
                                        </>) : ""}

                                    <div className="my-10 w-full flex justify-center items-center mt-52">
                                        {level > 1 ? (
                                            <button onClick={() => setLevel(1)} className="p-4  bg-main/4   0 rounded-2xl text-lx  w-[30%] mx-2 text-main hover:bg-main hover:text-white"> ย้อนกลับ </button>

                                        ) : ""}
                                        {level <= 4 ? (
                                            <button type="submit" className="p-4  bg-main/10 w-[70%] mx-2 rounded-2xl text-lx text-main hover:bg-main hover:text-white">ถัดไป  </button>

                                        ) : (
                                            <button onClick={edit} type="submit" className="p-4  bg-main/10 w-[70%] mx-2 rounded-2xl text-lx text-main hover:bg-main hover:text-white">ยืนยันการสร้างชุดข้อมูล     </button>

                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={`${level > 4 ? 'hidden' : "hidden lg:flex  w-[50%] bg-linear-to-b from-sky-200 rounded-r-2xl justify-center items-center "}`}>
                            <PreviewCard
                                name={name}
                                detail={detail}
                                dateStart={startDate}
                                dateEnd={endDate}
                                datedefault={datedefault}
                                latitude={latitude}
                                longitude={longitude}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}

function utc(option: unknown, c: typeof Dayjs, d: typeof dayjs): void {
    throw new Error("Function not implemented.");
}
function timezone(option: unknown, c: typeof Dayjs, d: typeof dayjs): void {
    throw new Error("Function not implemented.");
}

