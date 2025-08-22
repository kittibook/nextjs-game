import { usePathname, useRouter } from "next/navigation"


interface Props {
    setting: TypeSetting
}
interface TypeSetting {
    SettingGame_id: number
    label: string
    name: string
}
export default function CardSetting(prop: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const encodeId = (id: string) => btoa(id);

    return (
        <div onClick={e => router.push(pathname + '/' + encodeId(prop.setting.SettingGame_id.toString()))} className="col-span-1 bg-main/20 h-64 relative transition delay-150 hover:bg-main/50">
            <div className="w-5 h-1 bg-main/90 absolute top-0 right-0"></div>
            <div className="w-5 h-1 bg-main/90 absolute bottom-0 right-0"></div>
            <div className="w-5 h-1 bg-main/90 absolute top-0 left-0"></div>
            <div className="w-5 h-1 bg-main/90 absolute bottom-0 left-0"></div>
            <div className="w-1 h-5 bg-main/90 absolute top-0 right-0"></div>
            <div className="w-1 h-5 bg-main/90 absolute bottom-0 right-0"></div>
            <div className="w-1 h-5 bg-main/90 absolute top-0 left-0"></div>
            <div className="w-1 h-5 bg-main/90 absolute bottom-0 left-0"></div>

            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="text-sm lg:text-3xl text-black">{prop.setting.label} </div>
                {/* <div className="text-xs lg:text-lg text-black/20">จัดการการตั้งค่าของเกม {prop.setting.label} </div> */}

            </div>
        </div>
    )
}