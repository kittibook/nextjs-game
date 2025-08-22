'use client'
import LayoutAdmin from "@/app/Components/Layout/admin/admin";
import CardSetting from "@/app/Components/UI/admin/setting/cardSetting";
import { getAuth } from "@/app/Services/api.service";
import { useEffect, useState } from "react";

interface TypeSetting {
    SettingGame_id: number
    label: string
    name: string
}
export default function SettingGame() {

    const [setting, setSetting] = useState<TypeSetting[] | []>([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await getAuth('/admin/setting')
            if(res.success) {
                console.log(res.Setting)
                setSetting(res.Setting)
            }
        } catch {

        }
    }

    return (
        <LayoutAdmin>
            <div className="min-h-screen min-w-[100%] flex flex-col pt-15 pl-5 bg-gray-50">
                <div className="flex justify-between items-center  ">
                    <h1 className="text-2xl font-medium text-[rgb(31,56,76)]">จัดการการตั้งค่าของเกม</h1>
                </div>

                <div className="w-full flex justify-center mt-5">
                    <div className="p-4 w-[90%] rounded-2xl">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {setting?.length > 0 && (
                                <>
                                    {setting.map((setting) => (
                                         <CardSetting key={setting.SettingGame_id} setting={setting} />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </LayoutAdmin>
    )
}