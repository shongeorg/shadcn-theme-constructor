import { MoreVertical, Search } from "lucide-react";

const users = [
  { name: "Alex Johnson", email: "alex@example.com", status: "Active", role: "Admin" },
  { name: "Sarah Chen", email: "sarah@dev.com", status: "Active", role: "Developer" },
  { name: "Mike Ross", email: "mike@law.com", status: "Inactive", role: "User" },
  { name: "Elena Gilbert", email: "elena@vamp.com", status: "Active", role: "Moderator" },
];

export function UsersTable() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40"
            size={16}
          />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 bg-transparent border rounded-md text-sm outline-none focus:ring-1"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--card)",
            }}
          />
        </div>
      </div>

      <div
        className="border overflow-hidden"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <table className="w-full text-left border-collapse text-sm">
          <thead
            className="border-b"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--secondary)",
            }}
          >
            <tr>
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={i}
                className="border-b last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                style={{ borderColor: "var(--border)" }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs opacity-50">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${user.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 opacity-70">{user.role}</td>
                <td className="p-4 text-right">
                  <MoreVertical
                    size={16}
                    className="inline opacity-40 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
