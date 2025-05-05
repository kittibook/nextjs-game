

export default function AnalyzeMap() {
    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-700">
                        สรุปข้อมูลเชิงพื้นที่
                    </h2>
                </div>

                <button className="text-sm  bg-btn-dashboard border border-main-2 rounded p-2 text-main">View Report</button>
            </div>
            <div className="flex items-start w-full">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
                            <span className="text-gray-800">อ. ปง</span>
                        </div>
                        <div className="text-gray-700 text-lg font-medium ml-8">32%</div>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
                            <span className="text-gray-800">อ. เชียงคำ</span>
                        </div>
                        <div className="text-gray-700 text-lg font-medium ml-8">32%</div>
                    </div>
                </div>
            </div>

        </>
    )
}