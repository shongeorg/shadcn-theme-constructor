import { Bell, Mail, ShieldCheck } from "lucide-react";

type ToggleItemProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  active?: boolean;
};

function ToggleItem({ icon, label, description, active = false }: ToggleItemProps) {
  return (
    <div
      className="flex items-center justify-between p-4 border"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        borderRadius: "var(--radius)",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="p-2 rounded-md bg-black/5 dark:bg-white/5 opacity-70"
          style={{ color: "var(--foreground)" }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs opacity-50">{description}</p>
        </div>
      </div>
      <div
        className="w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors"
        style={{ backgroundColor: active ? "var(--primary)" : "var(--accent)" }}
      >
        <div
          className={`w-3 h-3 bg-white rounded-full transition-all ${active ? "translate-x-5" : "translate-x-0"}`}
        />
      </div>
    </div>
  );
}

export function SettingsForm() {
  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      <div className="space-y-6">
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest opacity-40">
            Profile Settings
          </h3>
          <div
            className="grid gap-4 p-6 border"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
                style={{ background: `linear-gradient(135deg, var(--primary), var(--accent))` }}
              >
                JD
              </div>
              <div className="flex-1">
                <button
                  className="text-xs font-bold hover:underline"
                  style={{ color: "var(--primary)" }}
                >
                  Upload new photo
                </button>
                <p className="text-[10px] opacity-40 mt-1">
                  JPG, GIF or PNG. Max size 2MB
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Display Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border rounded px-3 py-2 text-sm"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
                  defaultValue="John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-transparent border rounded px-3 py-2 text-sm"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
                  defaultValue="john@example.com"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest opacity-40">
            Preferences
          </h3>
          <div className="space-y-3">
            <ToggleItem
              icon={<Bell size={18} />}
              label="Push Notifications"
              description="Receive real-time alerts."
              active
            />
            <ToggleItem
              icon={<ShieldCheck size={18} />}
              label="Two-Factor Auth"
              description="Extra layer of security."
            />
            <ToggleItem
              icon={<Mail size={18} />}
              label="Email Marketing"
              description="Weekly design tips and updates."
              active
            />
          </div>
        </section>
      </div>
    </div>
  );
}
