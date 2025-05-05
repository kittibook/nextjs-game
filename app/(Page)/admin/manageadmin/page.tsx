import LayoutAdmin from "@/app/Components/Layout/admin/admin";


export default  function AdminManageAdmin() {
    return (
        <LayoutAdmin >
            <div className="min-h-screen flex flex-col bg-gray-50">
                <div className="flex justify-between items-center m-16 ">
                    <h1 className="text-lg font-medium text-[#1F384C]">จัดการข้อมูลผู้ดูแลระบบ</h1>
                </div>
            </div>
        </LayoutAdmin>
    )
}