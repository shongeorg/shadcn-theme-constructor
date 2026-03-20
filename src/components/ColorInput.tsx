type ColorInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onCommit: (value: string) => void;
};

export function ColorInput({ label, value, onChange, onCommit }: ColorInputProps) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-[11px] font-bold uppercase opacity-50 ml-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div
          className="relative w-8 h-8 rounded-md border overflow-hidden shrink-0 transition-transform group-hover:scale-110"
          style={{ borderColor: "var(--border)" }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onMouseUp={(e) => onCommit((e.target as HTMLInputElement).value)}
            className="absolute -inset-2 w-12 h-12 cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onCommit(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onCommit((e.target as HTMLInputElement).value)}
          className="flex-1 bg-transparent border rounded-md px-2 py-1.5 text-xs font-mono uppercase focus:ring-1 focus:ring-pink-500 outline-none"
          style={{ borderColor: "var(--border)" }}
        />
      </div>
    </div>
  );
}
