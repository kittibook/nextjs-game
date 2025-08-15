"use client";

import { useEffect, useRef } from "react";

export type ConfirmDeleteData = {
    name?: string;
    detail?: string;
    startDate?: string | Date;
    endDate?: string | Date;
    latitude?: string | Date;
    longitude?: string | Date;
};

function fmt(d?: string | Date) {
    if (!d) return "-";
    try {
        const date = typeof d === "string" ? new Date(d) : d;
        if (Number.isNaN(date.getTime())) return String(d);
        return date.toLocaleDateString();
    } catch {
        return String(d);
    }
}

export default function ConfirmDeleteModal({
    open,
    onClose,
    onConfirm,
    data = {},
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    data?: ConfirmDeleteData;
}) {
    const firstBtnRef = useRef<HTMLButtonElement | null>(null);

    // Close on ESC + lock scroll + focus first action button
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        // focus first button after open
        const id = window.setTimeout(() => firstBtnRef.current?.focus(), 0);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
            window.clearTimeout(id);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
                aria-hidden
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                className="relative z-[101] mx-4 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="ปิดหน้าต่าง"
                    className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {/* Title */}
                <h2 className="mb-4 text-center text-lg font-semibold text-gray-800">
                    คุณต้องการลบ ชุดข้อมูลนี้หรือไม่
                </h2>

                {/* Info box */}
                <div className="mb-6 rounded-xl bg-indigo-100 p-6 text-gray-800">
                    <div className="space-y-2 text-[15px] leading-6">
                        <Row label="ชื่อข้อมูล" value={data.name || "-"} />
                        <Row label="รายละเอียด" value={data.detail || "-"} />
                        <Row label="วันที่เริ่ม" value={fmt(data.startDate)} />
                        <Row label="วันที่สิ้นสุด" value={fmt(data.endDate)} />
                        <Row label="พักถัด" value={data.latitude?.toString() || ''} />
                        <Row label="พักถัด" value={data.longitude?.toString() || ''} />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-6">
                    <button
                        ref={firstBtnRef}
                        onClick={onConfirm}
                        className="min-w-[120px] rounded-xl bg-emerald-500 px-6 py-2.5 text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                        ตกลง
                    </button>
                    <button
                        onClick={onClose}
                        className="min-w-[120px] rounded-xl bg-red-500 px-6 py-2.5 text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4 text-gray-700">{label} :</div>
            <div className="col-span-8 font-medium text-gray-900">{value}</div>
        </div>
    );
}
