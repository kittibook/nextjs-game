'use client'

import { useState } from "react";

interface Prop {
    Front? : string
    NumFront? : string
    Back? : string
}
export default function RotateCard(prop : Prop) {
    const [deg, setDeg] = useState(180);

    return (
        <div className="w-full rounded-2xl bg-gray-200 h-96 flex flex-col items-center justify-center gap-6">

            {/* การ์ด */}
            <div className="[perspective:1000px]">
                <div
                    className={`
                                        relative w-[171px] h-[242px]
                                        [transform-style:preserve-3d]
                                        transition-transform duration-300
                                    `}
                    style={{ transform: `rotateY(${deg}deg)` }}
                >
                    {/* หน้า */}
                    <div
                        className={`
                                            absolute inset-0 rounded-lg
                                            flex items-center justify-center
                                            bg-white text-black font-semibold
                                            [backface-visibility:hidden]
                                        `}
                                        style={{ background: prop.Front ?? '#ffffff' }} 
                    >
                        <div
                            className={`card-front bg-white  ${prop.Front ? 'text-lg' : 'text-9xl'} font-bold font-mali text-blue-500`}
                          >
                    {prop.NumFront ? prop.NumFront : ''}

                          </div>
                    </div>

                    <div
                        className={`
                                            absolute inset-0 rounded-lg overflow-hidden
                                            [backface-visibility:hidden]
                                            [transform:rotateY(180deg)]
                                        `}
                    >
                        <img
                            src={prop.Back}
                            alt="Card Back"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* สไล*/}
            <div className="w-[260px]">
                <input
                    id="rotateY"
                    type="range"
                    min={0}
                    max={360}
                    value={deg}
                    onChange={(e) => setDeg(parseInt(e.target.value))}
                    className="w-full accent-indigo-600"
                />

            </div>

        </div>
    )
}