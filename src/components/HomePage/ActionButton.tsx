"use client";

type Props = {
  isCreating: boolean;
  loading: boolean;
  onSubmit: () => void;
  onToggle: () => void;
  onRandom: () => void;
};

export default function ActionButtons({
  isCreating,
  loading,
  onSubmit,
  onToggle,
  onRandom,
}: Props) {
  return (
    <>
      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full py-2 mb-3 bg-pink-600 hover:bg-pink-500 rounded-xl text-sm font-semibold shadow-md hover:scale-[1.02] transition-all"
      >
        {loading
          ? "Please wait..."
          : isCreating
          ? "🆕 Create Account"
          : "🚪 Login"}
      </button>

      <button
        onClick={onToggle}
        className="w-full py-2 mb-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold shadow-md hover:scale-[1.02] transition-all"
      >
        {isCreating ? "🔁 Switch to Login" : "🆕 Switch to Create Account"}
      </button>

      <button
        onClick={onRandom}
        className="w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-400 hover:to-orange-300 rounded-xl text-sm font-semibold shadow-md hover:scale-[1.02] transition-all"
      >
        🎲 Play Random Song
      </button>
    </>
  );
}
