"use client"
import LayoutAdmin from "@/app/Components/Layout/admin/admin";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function DataSetCreate() {
    const [level, setLevel] = useState<number>(1)
    
    return (
        <LayoutAdmin>
            <div className="min-h-screen w-full flex flex-col bg-gray-50">
                <div className="flex justify-between items-center p-16 ">
                    <h1 className="text-lg font-medium text-[#1F384C]">สร้างชุดข้อมูล</h1>
                </div>
                <div className="flex justify-center items-center w-full ">
                    <div className="w-[90%] bg-bgnavbar-2 rounded-2xl flex">
                        <div className=" w-full lg:w-[50%] ">
                            <div className="m-5 flex justify-between"> </div>
                            <div className=" mx-5 px-20">
                                <div className="h-2 w-full bg-main/30 rounded-2xl my-2 relative">
                                    <div style={{ width: `${Math.min(level * 20, 100)}%` }}
                                        className={`bg-main h-full rounded-2xl`}></div>
                                </div>

                                <div className="my-10 w-full flex justify-center items-center">
                                    <div className="text-2xl">สร้างชุดข้อมูล</div>
                                </div>

                                <div className="my-20 w-full flex flex-col justify-center items-center">
                                    <div className="text-xl text-start p-2 w-full">ชื่อชุดข้อมูล</div>
                                    <input type="text" className=" p-4 w-full rounded-2xl bg-main/20 focus:ring-2 ring-main/30 shadow-xl  border-2 border-main" placeholder="ชื่อชุดข้อมูล" />
                                </div>

                                <div className="my-10 w-full flex justify-center items-center mt-52">
                                    {/* <button className="p-4 px-10 bg-main/10 rounded-2xl text-lx text-main hover:bg-main hover:text-white"></button> */}
                                    <button className="p-4 px-10 bg-main/10 w-full rounded-2xl text-lx text-main hover:bg-main hover:text-white">ถัดไป ! </button>
                                </div>

                            </div>
                        </div>
                        <div className=" hidden lg:flex  w-[50%] bg-linear-to-b from-sky-200 rounded-r-2xl justify-center items-center">
                            <div className="w-96 h-36 bg-white rounded-2xl border border-main/30 p-5">
                                <div className="flex justify-start items-center" >
                                    <p>ชื่อข้อมูล : </p>
                                    <div className="skeleton mx-2 h-3 w-[70%] bg-gray-200 rounded-2xl"></div>
                                </div>
                                <div className="flex justify-start items-center">
                                    <p>รายละเอียด : </p>
                                    <div className="skeleton mx-2 h-3 w-[70%] bg-gray-200 rounded-2xl"></div>
                                </div>
                                <div className="flex justify-start items-center">
                                    <p>วันที่ : </p>
                                    <div className="skeleton mx-2 h-3 w-[70%] bg-gray-200 rounded-2xl"></div>
                                </div>
                                <div className="flex justify-start items-center">
                                    <p>พิกัด : </p>
                                    <div className="skeleton mx-2 h-3 w-[70%] bg-gray-200 rounded-2xl"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}