import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
};

export function StatCard({ title, value, trend, icon: Icon }: StatCardProps) {
  const isPositive = trend.startsWith("+");

  return (
    <div
      className="p-6 border shadow-sm flex flex-col gap-1 transition-all hover:translate-y-[-2px]"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        borderRadius: "var(--radius)",
      }}
    >
      <div className="flex items-center justify-between opacity-50">
        <span className="text-xs font-bold uppercase tracking-wider">
          {title}
        </span>
        <div style={{ color: "var(--primary)" }}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}
