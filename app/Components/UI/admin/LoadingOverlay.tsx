'use client';

export default function LoadingOverlay() {

  return (
    <div
      className="h-screen min-w-[100%] z-[100] bg-gray-50 backdrop-blur-sm flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3">
        {/* วงกลมหมุน */}
        <div className="h-12 w-12 rounded-full border-4 border-black/60 border-t-transparent animate-spin" />
        <p className="text-black/60 text-sm">กำลังโหลดข้อมูล…</p>
      </div>
    </div>
  );
}
