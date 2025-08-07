"use client";
import { useState } from "react";

export default function AddSongForm({
  onAdd,
  onCancel,
}: {
  onAdd: (url: string) => void;
  onCancel: () => void;
}) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAdd(url);
      setUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste YouTube URL"
        className="w-full p-2 rounded bg-white/10 placeholder-white/50 focus:ring-2 ring-pink-400"
      />
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-500 font-semibold"
        >
          Add
        </button>
      </div>
    </form>
  );
}
