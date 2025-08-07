"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "./TextInput";
import ActionButtons from "./ActionButton";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password");
      return;
    }

    setLoading(true);
    const endpoint = isCreating ? "/api/user" : "/api/login";
    const body = JSON.stringify({ username, password });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await res.json();
      if (res.ok) {
        alert(isCreating ? "Account created!" : "Login successful!");
        router.push(`/dashboard/${encodeURIComponent(username)}`);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-10 max-w-md w-full mx-auto p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-white drop-shadow">
        🎶 <span className="text-pink-400">Relaxify</span>
      </h1>

      <TextInput
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <ActionButtons
        isCreating={isCreating}
        loading={loading}
        onSubmit={handleSubmit}
        onToggle={() => setIsCreating(!isCreating)}
        onRandom={() => router.push("/random")}
      />
    </div>
  );
}
