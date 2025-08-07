import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to your dashboard</h1>
      <LogoutButton />
    </div>
  );
}
