export default function PlayerWrapper({ children }: { children: React.ReactNode }) {
  return <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full">{children}</div>;
}
