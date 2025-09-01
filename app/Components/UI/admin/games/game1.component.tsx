'use client';

import { Config } from "@/app/Config/api.config";
import { GameDetail } from "@/app/Types/admin";

interface Prop {
    detail: GameDetail[]
}


export default function ReplayGame1(props: Prop) {

    console.log(props)

    return (
        <div>
            <div className="w-full h-full flex flex-col items-center justify-center">
                {props.detail.map((detail) => (
                    <img
                        key={detail.url}
                        src={Config.image + detail.url}
                        alt=""
                        className="w-[50%] h-[50%] object-cover rounded-2xl"
                    />
                ))}

            </div>
        </div>
    )
}

