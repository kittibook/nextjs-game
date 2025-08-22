'use client'

import LayoutAdmin from "@/app/Components/Layout/admin/admin"
import BtnSetting from "@/app/Components/UI/admin/setting/btnSetting";
import MenuGame1 from "@/app/Components/UI/admin/setting/editgame/game1/menu";
import { getAuth } from "@/app/Services/api.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TypeSetting {
    SettingGame_id: number
    label: string
    name: string
    SettingGameDetail: Detail[]
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
export default function SettingGameID() {
    const params = useParams()
    const router = useRouter();

    const decodeId = (encodedId: string) => {
        const id = decodeURIComponent(encodedId)
        return atob(id)
    };

    const [setting, setSetting] = useState<TypeSetting | null >( null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const datasetId = decodeId(params.settingid as string);
            const res = await getAuth('/admin/setting/detail/' + datasetId)
            console.log(res)
            if (res.success) {
                setSetting(res.Setting)
            }

        } catch (error) {

        }
    }
    return (
        <LayoutAdmin>
            <div className="min-h-screen min-w-[100%] flex flex-col pt-15 pl-5 bg-gray-50">
                <div className="flex justify-between items-center  ">
                    <h1 className="text-2xl font-medium text-[rgb(31,56,76)]">จัดการการตั้งค่าของเกม</h1>
                </div>

                <div className="w-full flex justify-center mt-5">
                    <div className="p-4 w-[90%] rounded-2xl bg-bgnavbar-2">
                        
                        {setting?.name === 'game1' && (
                            <MenuGame1 detail={setting.SettingGameDetail} />
                        )}


                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}