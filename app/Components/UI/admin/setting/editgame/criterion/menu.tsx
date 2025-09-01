import { putAuth } from "@/app/Services/api.service";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Bounce, toast } from "react-toastify";

interface Prop {
  detail: Detail[];
  /** ถ้ามีหลายรายการ สามารถส่ง id ที่อยากแก้มาได้; ถ้าไม่ส่งจะหยิบตัวแรก */
  targetId?: number;
  /** กำหนดช่วงคะแนนได้ เช่น 0-100 */
  min?: number;
  max?: number;
}

interface Detail {
  SettingGameDetail_id: number;
  SettingGameid: number;
  createdAt: string;
  url: string;
  evaluation_result: number;
}

/** กรอบ UI มุมสวย ๆ แบบใช้ซ้ำได้ */
function CornerFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-4 py-2 transition delay-100 relative ${className}`}>
      <div className="w-2 h-1 bg-current absolute top-0 right-0"></div>
      <div className="w-2 h-1 bg-current absolute bottom-0 right-0"></div>
      <div className="w-2 h-1 bg-current absolute top-0 left-0"></div>
      <div className="w-2 h-1 bg-current absolute bottom-0 left-0"></div>
      <div className="w-1 h-2 bg-current absolute top-0 right-0"></div>
      <div className="w-1 h-2 bg-current absolute bottom-0 right-0"></div>
      <div className="w-1 h-2 bg-current absolute top-0 left-0"></div>
      <div className="w-1 h-2 bg-current absolute bottom-0 left-0"></div>
      {children}
    </div>
  );
}

export default function MenuGameCr({ detail, targetId, min = 0, max = 20 }: Prop) {
  const router = useRouter();

  // เลือกรายการที่จะแก้ไข: จาก targetId ถ้ามี ไม่งั้นหยิบตัวแรก
  const target = useMemo(() => {
    if (!Array.isArray(detail) || detail.length === 0) return undefined;
    if (typeof targetId === "number") {
      return detail.find((d) => d.SettingGameDetail_id === targetId) ?? detail[0];
    }
    return detail[0];
  }, [detail, targetId]);

  // state คะแนน (string เพื่อคุม input ได้เนียน ๆ)
  const [criterion, setCriterion] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  // init จากค่าปัจจุบัน
  useEffect(() => {
    if (target) {
      setCriterion(String(target.evaluation_result ?? ""));
    } else {
      setCriterion("");
    }
  }, [target]);

  const parsed = useMemo(() => {
    const n = Number(criterion);
    return Number.isFinite(n) ? n : NaN;
  }, [criterion]);

  const isInvalid = useMemo(() => {
    // ไม่ให้ว่าง, ต้องเป็นตัวเลข และอยู่ในช่วง
    if (criterion.trim() === "") return true;
    if (Number.isNaN(parsed)) return true;
    if (parsed < min || parsed > max) return true;
    return false;
  }, [criterion, parsed, min, max]);

  const submit = async () => {
    if (!target) {
      toast.error("ไม่พบรายการที่จะอัปเดต", { theme: "light", transition: Bounce });
      return;
    }
    if (isInvalid) {
      toast.error(`กรุณากรอกคะแนนเป็นตัวเลขช่วง ${min}-${max}`, {
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    setSubmitting(true);
    try {
      const data = {
        setting: target.SettingGameDetail_id,
        evaluation: parsed, // ส่งเป็น number ให้ backend ตรง ๆ
      };

      const res = await putAuth("/admin/setting/criterion-setting", data);

      if (res?.success) {
        toast.success("แก้ไขสำเร็จ !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        // รีเฟรชข้อมูลหน้าเดิม (ดีกว่า reload ทั้งหน้า)
        router.refresh();
      } else {
        toast.error(res?.message ?? "ไม่สามารถบันทึกได้", {
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message ?? "เกิดข้อผิดพลาดระหว่างบันทึก", {
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-xs md:text-sm lg:text-xl mb-2">
          กรอกเกณฑ์การประเมิน (คะแนน {min}-{max})
        </div>

        <CornerFrame className="bg-main/20 hover:bg-main/40 text-main">
          <input
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={1}
            className="w-full h-full bg-transparent outline-none"
            value={criterion}
            onChange={(e) => setCriterion(e.target.value)}
            disabled={submitting || !target}
            placeholder={`เช่น 60`}
          />
        </CornerFrame>

        <div className="w-full flex justify-center gap-2 my-5">
          <button
            onClick={() => router.push("/admin/settings/game")}
            className="px-4 py-2 text-red-500/90 hover:text-white bg-red-400/20 hover:bg-red-400/50 relative"
            disabled={submitting}
          >
            <span className="relative z-10">ย้อนกลับ</span>
          </button>

          <button
            onClick={submit}
            disabled={submitting || isInvalid || !target}
            className={`px-4 py-2 relative ${
              submitting || isInvalid || !target
                ? "bg-green-400/20 text-green-900/40 cursor-not-allowed"
                : "bg-green-400/20 hover:bg-green-400/50 text-green-700 hover:text-white"
            }`}
          >
            <span className="relative z-10">
              {submitting ? "กำลังบันทึก..." : "ยืนยัน"}
            </span>
          </button>
        </div>

        {!target && (
          <p className="text-red-500 text-sm text-center">
            ไม่พบข้อมูลรายการที่จะตั้งค่า
          </p>
        )}
      </div>
    </div>
  );
}
