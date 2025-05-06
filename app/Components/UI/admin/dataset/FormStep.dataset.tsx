import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
const MapDataSet = dynamic(() => import('@//app/Components/UI/admin/dataset/map'), { ssr: false });

interface FormStepProps {
    level: number;
    name: string;
    detail: string;
    setName: (val: string) => void;
    setDetail: (val: string) => void;
    fetchLocationFromStorage: () => void;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    setStartDate: (val: Dayjs | null) => void;
    setEndDate: (val: Dayjs | null) => void;
}


export function FormStepDataSet({
    level,
    name,
    detail,
    setName,
    setDetail,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    fetchLocationFromStorage
}: FormStepProps) {
    switch (level) {
        case 1:
            return (
                <div className="my-20 w-full flex flex-col justify-center items-center">
                    <div className="text-xl text-start p-2 w-full">ชื่อชุดข้อมูล</div>
                    <input
                        required
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="p-4 w-full rounded-2xl bg-main/20 focus:ring-2 ring-main/30 shadow-xl border-2 border-main"
                        placeholder="ชื่อชุดข้อมูล"
                    />
                </div>
            );
        case 2:
            return (
                <div className="my-20 w-full flex flex-col justify-center items-center">
                    <div className="text-xl text-start p-2 w-full">รายละเอียดชุดข้อมูล</div>
                    <textarea
                        required
                        onChange={(e) => setDetail(e.target.value)}
                        className="p-4 w-full rounded-2xl bg-main/20 focus:ring-2 ring-main/30 shadow-xl border-2 border-main"
                        placeholder="รายละเอียดชุดข้อมูล"
                    />
                </div>
            );
        case 3:
            return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                        {/* Start - Controlled DateTimePicker */}
                        <DateTimePicker
                            label="วันที่เริ่ม"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            className="bg-white text-black"
                        />
                        {/* End - Controlled DateTimePicker */}
                        <DateTimePicker
                            label="วันที่สิ้นสุด"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            className="bg-white text-black"
                        />
                    </DemoContainer>
                </LocalizationProvider>
            );
        case 4:
            return (
                <div onClick={fetchLocationFromStorage} className="w-full flex justify-center items-center">
                    <MapDataSet />
                </div>
            );
        default:
            return null;
    }
}
