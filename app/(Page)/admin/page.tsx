"use client"

import LayoutAdmin from "@/app/Components/Layout/admin/admin";
import RiskChart from "@/app/Components/UI/admin/dashboard/riskChart";
import ScoreChart from "@/app/Components/UI/admin/dashboard/scoreChart";
import ScorePicChart from "@/app/Components/UI/admin/dashboard/screPicChart";
import UserChart from "@/app/Components/UI/admin/dashboard/userChart";
import UserLatest from "@/app/Components/UI/admin/dashboard/userLatest";





export default function adminPage() {
    return (
        <LayoutAdmin>
            <div className="min-h-screen min-w-[100%] flex flex-col pt-15 pl-5">
                <div className="flex justify-between items-center  ">
                    <h1 className="text-lg font-medium text-[#1F384C]">แดชบอร์ด</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                    <div className="col-span-1 lg:col-span-2 transition-all duration-300 p-9 lg:border-r border-[#C8CBD9] w-full  min-h-72 ">
                        <UserChart />
                    </div>
                    <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72">
                        <RiskChart />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:border-t border-[#C8CBD9]">
                    <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
                        <ScoreChart />
                    </div>
                    <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
                        <ScorePicChart />
                    </div>
                    <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
                        <UserLatest />
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}