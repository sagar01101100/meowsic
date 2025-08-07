"use client";

type TextInputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function TextInput({
  label,
  type,
  value,
  onChange,
  placeholder,
}: TextInputProps) {
  return (
    <div className="mb-4">
      <label className="text-white/80 text-sm block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white/10 text-white w-full p-2 rounded-md placeholder-white/50 focus:outline-none focus:ring-2 ring-pink-400"
      />
    </div>
  );
}
