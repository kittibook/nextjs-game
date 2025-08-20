"use client"
import Link from "next/link";

import { HiChartPie, HiChartSquareBar, HiUser, HiUserCircle, HiClipboardList } from "react-icons/hi";
import { ReactNode } from "react";
import { Poppins } from 'next/font/google';
import NavBar from "@/app/Components/UI/admin/Navbar";
import { ToastContainer } from 'react-toastify';
import { usePathname } from "next/navigation";
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export default function LayoutAdmin({ children }: { children: ReactNode }) {

    const itemLink = [
        {
            title: "แดชบอร์ด",
            to: "/admin",
            icon: <HiChartPie size={24} />,
        },
        {
            title: "วิเคราะห์ข้อมูล",
            to: "/admin/analyze",
            icon: <HiChartSquareBar size={24} />,
        },
        {
            title: "จัดการชุดข้อมูล",
            to: "/admin/dataset",
            icon: <HiClipboardList size={24} />,
        },
        {
            title: "จัดการข้อมูลผู้ใช้งาน",
            to: "/admin/manageuser",
            icon: <HiUser size={24} />,
        },
        {
            title: "จัดการข้อมูลผู้ดูแลระบบ",
            to: "/admin/manageadmin",
            icon: <HiUserCircle size={24} />,
        },


    ]
    return (
        <div className={`flex min-h-screen ${poppins.className}`}>
            <NavBar />
            <div className="fixed top-0 left-0 min-h-full w-15 md:w-64 bg-bgnavbar-2 pt-28 flex justify-center">
                <div className="space-y-4 w-full px-4">
                    {itemLink.map((value, index) => (
                        <NavItem item={value} key={index} />
                    ))}
                </div>
            </div>
            <div className="flex-1 ml-12 md:ml-64 md:mt-0 md:m-0 ">
                <div className="w-full bg-gray-50">{children}</div>
                <ToastContainer />
            </div>
        </div>
    )
}

const NavItem = ({
    item,
}: {
    item: { title: string; to: string; icon: React.ReactNode };
}) => {
    const pathname = usePathname();
    const isActive = pathname === item.to;

    return (
        <Link
            key={item.to}
            href={item.to}
            className={`flex items-center justify-center md:justify-normal md:space-x-3 md:p-3 rounded-lg  md:text-sm  ${isActive ? "bg-bgnavbar-1/55 hover:bg-bgnavbar-1/40 text-main" : " hover:bg-[#e8ebff] text-main/60"
                }`}
        >
            {item.icon}
            <span className=" hidden md:block">{item.title}</span>
        </Link>
    );
};