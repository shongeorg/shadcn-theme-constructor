import { Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItemProps = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
};

export function NavItem({ icon: Icon, label, active = false, onClick }: NavItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-2.5 cursor-pointer transition-all duration-200 group"
      style={{
        backgroundColor: active ? "var(--primary)" : "transparent",
        color: active ? "var(--primaryForeground)" : "inherit",
        borderRadius: "var(--radius)",
        opacity: active ? 1 : 0.6,
      }}
    >
      <Icon size={18} />
      <span className="text-sm font-semibold">{label}</span>
      {active && <Zap size={14} className="ml-auto animate-pulse" />}
    </div>
  );
}
