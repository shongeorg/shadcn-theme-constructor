import { Users, BarChart3, Layers } from "lucide-react";
import { StatCard } from "./StatCard";

export function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="opacity-50 mt-1">
            Real-time overview of your application metrics.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 font-semibold shadow-lg transition-all hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primaryForeground)",
            borderRadius: "var(--radius)",
          }}
        >
          + New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value="24,812"
          trend="+12.5%"
          icon={Users}
        />
        <StatCard
          title="Revenue"
          value="$84,210"
          trend="+8.2%"
          icon={BarChart3}
        />
        <StatCard
          title="Active Projects"
          value="156"
          trend="+4.1%"
          icon={Layers}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div
          className="lg:col-span-3 p-6 border shadow-sm relative overflow-hidden"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
          }}
        >
          <h3 className="font-bold mb-4">Activity Growth</h3>
          <div className="h-48 w-full">
            <svg
              className="w-full h-full"
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--primary)"
                    stopOpacity="0.4"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--primary)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <path
                d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,10"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
              />
              <path
                d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,10 V100 H0 Z"
                fill="url(#chartGrad)"
              />
            </svg>
          </div>
        </div>
        <div
          className="lg:col-span-2 p-6 border shadow-sm"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
          }}
        >
          <h3 className="font-bold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            {[
              { label: "API Requests", value: 80 },
              { label: "Server Load", value: 65 },
              { label: "Database Health", value: 95 },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div
                  className="h-2 w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  <div
                    className="h-full transition-all"
                    style={{
                      backgroundColor: "var(--primary)",
                      width: `${item.value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
