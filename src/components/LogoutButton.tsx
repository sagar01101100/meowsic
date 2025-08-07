"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        alert("Logged out successfully!");
        router.push("/"); // Redirect to home page
      } else {
        alert("Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-semibold shadow-md transition-all hover:scale-[1.02]"
    >
      🔒 Logout
    </button>
  );
}
