'use client'

import LayoutAdmin from "@/app/Components/Layout/admin/admin"
import LoadingOverlay from "@/app/Components/UI/admin/LoadingOverlay";
import BtnSetting from "@/app/Components/UI/admin/setting/btnSetting";
import MenuGameCr from "@/app/Components/UI/admin/setting/editgame/criterion/menu";
import MenuGame1 from "@/app/Components/UI/admin/setting/editgame/game1/menu";
import MenuGame2 from "@/app/Components/UI/admin/setting/editgame/game2/menu";
import MenuGame3 from "@/app/Components/UI/admin/setting/editgame/game3/menu";
import MenuGame4 from "@/app/Components/UI/admin/setting/editgame/game4/menu";
import MenuGame5 from "@/app/Components/UI/admin/setting/editgame/game5/menu";
import MenuGame6 from "@/app/Components/UI/admin/setting/editgame/game6/menu";
import { getAuth } from "@/app/Services/api.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";

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
    evaluation_result : number
    url: string
}
export default function SettingGameID() {
    const params = useParams()
    const router = useRouter();

    const decodeId = (encodedId: string) => {
        const id = decodeURIComponent(encodedId)
        return atob(id)
    };

    const [setting, setSetting] = useState<TypeSetting | null>(null)

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
            {setting === null ? (
                <LoadingOverlay />
            ) : (
                <div className="h-screen min-w-[100%] flex flex-col pt-15 pl-5 bg-gray-50">

                    <div onClick={e => router.back()} className="flex items-center gap-2">
                        <h1 className=" text-sm lg:text-lg font-medium text-[rgb(31,56,76)]">จัดการการตั้งค่าของเกม</h1>
                        <IoChevronForward />
                        <h1 className="text-sm lg:text-lg font-medium text-[rgb(31,56,76)]">{setting?.label}</h1>

                    </div>

                    <div  className="w-[99%] lg:h-[90%] h-full bg-bgnavbar-2 flex justify-center mt-5 relative">
                        <div className="w-5 h-1 bg-main/90 absolute top-0 right-0"></div>
                        <div className="w-5 h-1 bg-main/90 absolute bottom-0 right-0"></div>
                        <div className="w-5 h-1 bg-main/90 absolute top-0 left-0"></div>
                        <div className="w-5 h-1 bg-main/90 absolute bottom-0 left-0"></div>
                        <div className="w-1 h-5 bg-main/90 absolute top-0 right-0"></div>
                        <div className="w-1 h-5 bg-main/90 absolute bottom-0 right-0"></div>
                        <div className="w-1 h-5 bg-main/90 absolute top-0 left-0"></div>
                        <div className="w-1 h-5 bg-main/90 absolute bottom-0 left-0"></div>
                        <div className="p-4 w-[90%] h-full rounded-2xl ">

                            {setting?.name === 'game1'  && (
                                <MenuGame1 detail={setting.SettingGameDetail} />
                            )}

                            {setting?.name === 'game2'  && (
                                <MenuGame2 detail={setting.SettingGameDetail} />
                            )}
                            
                            {setting?.name === 'game3'  && (
                                <MenuGame3 detail={setting.SettingGameDetail} />
                            )}

                            {setting?.name === 'game4'  && (
                                <MenuGame4 detail={setting.SettingGameDetail} />
                            )}

                            {setting?.name === 'game5'  && (
                                <MenuGame5 detail={setting.SettingGameDetail} />
                            )}

                            {setting?.name === 'game6'  && (
                                <MenuGame6 detail={setting.SettingGameDetail} />
                            )}

                            {setting?.name === 'criterion'  && (
                                <MenuGameCr detail={setting.SettingGameDetail} />
                            )}





                        </div>
                    </div>

                </div>
            )}

        </LayoutAdmin>
    )
}