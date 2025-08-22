import BtnSetting from "../../btnSetting";

interface Prop {
    detail : Detail[]
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


export default function MenuGame1( prop : Prop) {

    return (
        <div className="rounded-2xl flex flex-col items-center justify-center gap-6">
            <div className="">
                <img
                    src="https://apigamenewversion.bxok.online/public/image/Image-Demo.png"
                    alt="Card Back"
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>

            <div className="w-full flex justify-center gap-2">
                <div className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50 relative">
                    <BtnSetting name={'เปลี่ยนรูป'} />
                </div>

                <div className="px-4 py-2 bg-main/20 transition delay-100 hover:bg-main/50  relative">
                    <BtnSetting name={'เปลี่ยนเสียง'} />
                </div>
            </div>
        </div>
    )
}