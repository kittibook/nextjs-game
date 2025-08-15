import { Dayjs } from "dayjs";

interface PreviewCardProps {
  name: string;
  detail: string;
  dateStart: Dayjs | null;
  dateEnd: Dayjs | null;
  datedefault: Dayjs | null;
  latitude: number | null;
  longitude: number | null;
}

export function PreviewCard({ name, detail, dateEnd, dateStart, datedefault, latitude, longitude }: PreviewCardProps) {

  const formatDateThai = (dateString: string): string => {
    const date = new Date(dateString);

    const months = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543; // แปลง ค.ศ. → พ.ศ.

    return `${day} ${month} ${year}`;
  }
  return (
    <div className="w-96 bg-white rounded-2xl border border-main/30 p-5 pb-5">
      <div className="flex justify-start items-center">
        <p>ชื่อข้อมูล : </p>
        {name ? <div className="mx-2">{name}</div> : <Skeleton />}
      </div>
      <div className="flex justify-start items-center">
        <p>รายละเอียด : </p>
        {detail ? (
          <div className="mx-2 w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{detail}</div>
        ) : (
          <Skeleton />
        )}
      </div>
      <div className="flex justify-start items-center">
        <p>วันที่เริ่ม : </p>
        {dateStart !== null && dateStart ? (
          <div className="mx-2 w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{formatDateThai(dateStart.toString())}</div>
        ) : (
          <Skeleton />
        )}
      </div>
      <div className="flex justify-start items-center">
        <p>วันที่สิ้นสุด : </p>
        {dateEnd !== null && dateEnd ? (
          <div className="mx-2 w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{formatDateThai(dateEnd.toString())}</div>
        ) : (
          <Skeleton />
        )}
      </div>
      <div className="flex justify-start items-center">
        <p>พิกัด : </p>
        {latitude ? (
          <>
            <div className="mx-2">{latitude}</div>
          </>
        ) : (
          <Skeleton />
        )}
      </div>
      <div className="flex justify-start items-center">
        <p>พิกัด : </p>
        {longitude ? (
          <>
            <div className="mx-2">{longitude}</div>
          </>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}

function Skeleton() {
  return <div className="skeleton mx-2 h-3 w-[70%] bg-gray-200 rounded-2xl" />;
}
