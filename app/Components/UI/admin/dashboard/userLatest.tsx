

export default function () {
    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-700">
                        ผู้เข้าร่วมประเมินล่าสุด
                    </h2>
                    <h3 className="text-sm text-slate-500">
                        ผู้เข้าร่วมประเมินล่าสุด 5 ลำดับ
                    </h3>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center w-full space-y-4 h-64 overflow-auto">
                {[1, 2, 3, 4, 5].map((v, i) => (
                    <div key={i} className="flex justify-center items-center text-lg border border-main-2 p-2 rounded-lg ">
                        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                        <div className="mx-5"> Username {v}</div>
                        <div className="mx-5"> 10 คะแนน</div>
                    </div>
                ))}

            </div>
        </>
    )
}