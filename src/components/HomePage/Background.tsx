type Props = {
  children: React.ReactNode;
};

export default function Background({ children }: Props) {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?fit=crop&w=1470&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      {children}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}
