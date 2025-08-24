"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Config } from "./Config/api.config";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await fetch(Config.url + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });


      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token); // ✅ เก็บ token
        router.push("/admin"); // ✅ ไปหน้าหลัก
      } else {
        throw new Error(data.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-main/20">
      <div className="bg-main/50 p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold text-white text-center mb-6">เข้าสู่ระบบ</h2>

        <div className="mb-4">
          <label className="flex items-center gap-2 text-white">
            <User size={18} /> Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="กรอกชื่อผู้ใช้"
            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 text-white">
            <Lock size={18} /> Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน"
              className="w-full px-4 py-2 mt-1 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={login}
          className="w-full py-2 rounded-lg bg-main text-white font-bold hover:opacity-90 transition"
        >
          ➜ เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}
