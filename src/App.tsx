import { useState, useEffect, useRef, useCallback } from "react";
import {
  LayoutDashboard,
  Settings,
  Palette,
  Download,
  Users,
  RefreshCcw,
  Moon,
  Sun,
  Undo2,
  Redo2,
  Check,
  Copy,
  X,
} from "lucide-react";
import { ColorInput } from "@/components/ColorInput";
import { RadiusSlider } from "@/components/RadiusSlider";
import { NavItem } from "@/components/NavItem";
import { AIHeader } from "@/components/AIHeader";
import { Dashboard, UsersTable, SettingsForm } from "@/components/preview";
import { useThemeStore } from "@/store/theme";
import type { Theme } from "@/types/theme";

type Page = "dashboard" | "users" | "settings";

function App() {
  const { darkTheme, lightTheme, mode, setTheme, setBothThemes, reset, toggleMode, undo, redo, canUndo, canRedo } = useThemeStore();
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [copied, setCopied] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [exportMode, setExportMode] = useState<"dark" | "light" | "both">("both");
  const [pendingTheme, setPendingTheme] = useState<Partial<Theme>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const theme = mode === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    const root = document.documentElement;
    (Object.entries(theme) as [keyof Theme, string][]).forEach(([key, value]) => {
      if (key === "radius") {
        root.style.setProperty("--radius", `${value}rem`);
      } else {
        const cssVar = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        root.style.setProperty(`--${cssVar}`, value);
      }
    });
  }, [theme]);

  const commitThemeChange = useCallback(() => {
    if (Object.keys(pendingTheme).length > 0) {
      setTheme(pendingTheme);
      setPendingTheme({});
    }
  }, [pendingTheme, setTheme]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleInputChange = (key: keyof Theme, value: string) => {
    const newPending = { ...pendingTheme, [key]: value };
    setPendingTheme(newPending);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      commitThemeChange();
    }, 300);
  };

  const handleInputCommit = (key: keyof Theme, value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setPendingTheme({});
    setTheme({ [key]: value });
  };

  const handleUndo = () => {
    undo();
  };

  const handleRedo = () => {
    redo();
  };

  const handleAITheme = (dark: Partial<Theme>, light: Partial<Theme>) => {
    setBothThemes(dark, light);
  };

  const generateCSSForTheme = (t: Theme, selector: string): string => {
    return `${selector} {
  --background: ${t.background};
  --foreground: ${t.foreground};
  --card: ${t.card};
  --card-foreground: ${t.foreground};
  --primary: ${t.primary};
  --primary-foreground: ${t.primaryForeground};
  --secondary: ${t.secondary};
  --secondary-foreground: ${t.secondaryForeground};
  --muted: ${t.secondary};
  --muted-foreground: ${t.accentForeground};
  --accent: ${t.accent};
  --accent-foreground: ${t.accentForeground};
  --border: ${t.border};
  --radius: ${t.radius}rem;
}`;
  };

  const generateCSS = (): string => {
    if (exportMode === "both") {
      return `${generateCSSForTheme(darkTheme, ".dark")}\n\n${generateCSSForTheme(lightTheme, ".light")}`;
    }
    if (exportMode === "dark") {
      return generateCSSForTheme(darkTheme, ":root");
    }
    return generateCSSForTheme(lightTheme, ":root");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UsersTable />;
      case "settings":
        return <SettingsForm />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className="flex h-screen w-full overflow-hidden font-sans transition-colors duration-300"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <aside
        className="w-80 border-r shrink-0 flex flex-col transition-colors duration-300 z-10 shadow-2xl"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
        }}
      >
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2 font-bold text-lg">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow: "0 0 20px var(--primary)",
              }}
            >
              <Palette size={18} />
            </div>
            <span>Theme Builder</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={reset}
              title="Reset Theme"
              className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 opacity-60 transition-all active:rotate-180"
            >
              <RefreshCcw size={16} />
            </button>
            <button
              onClick={toggleMode}
              title={mode === "dark" ? "Light Mode" : "Dark Mode"}
              className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-40">
              Navigation
            </h3>
            <nav className="space-y-1">
              <NavItem
                icon={LayoutDashboard}
                label="Dashboard"
                active={activePage === "dashboard"}
                onClick={() => setActivePage("dashboard")}
              />
              <NavItem
                icon={Users}
                label="Users"
                active={activePage === "users"}
                onClick={() => setActivePage("users")}
              />
              <NavItem
                icon={Settings}
                label="Settings"
                active={activePage === "settings"}
                onClick={() => setActivePage("settings")}
              />
            </nav>
          </div>

          <div className="border-t pt-6" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-40">
              Theme Customization
            </h3>
            <div className="space-y-4">
              <ColorInput
                label="Primary"
                value={theme.primary}
                onChange={(val) => handleInputChange("primary", val)}
                onCommit={(val) => handleInputCommit("primary", val)}
              />
              <ColorInput
                label="Primary Foreground"
                value={theme.primaryForeground}
                onChange={(val) => handleInputChange("primaryForeground", val)}
                onCommit={(val) => handleInputCommit("primaryForeground", val)}
              />
              <ColorInput
                label="Background"
                value={theme.background}
                onChange={(val) => handleInputChange("background", val)}
                onCommit={(val) => handleInputCommit("background", val)}
              />
              <ColorInput
                label="Foreground"
                value={theme.foreground}
                onChange={(val) => handleInputChange("foreground", val)}
                onCommit={(val) => handleInputCommit("foreground", val)}
              />
              <ColorInput
                label="Card"
                value={theme.card}
                onChange={(val) => handleInputChange("card", val)}
                onCommit={(val) => handleInputCommit("card", val)}
              />
              <ColorInput
                label="Secondary"
                value={theme.secondary}
                onChange={(val) => handleInputChange("secondary", val)}
                onCommit={(val) => handleInputCommit("secondary", val)}
              />
              <ColorInput
                label="Accent"
                value={theme.accent}
                onChange={(val) => handleInputChange("accent", val)}
                onCommit={(val) => handleInputCommit("accent", val)}
              />
              <ColorInput
                label="Border"
                value={theme.border}
                onChange={(val) => handleInputChange("border", val)}
                onCommit={(val) => handleInputCommit("border", val)}
              />
              <RadiusSlider
                value={theme.radius}
                onCommit={(val) => handleInputCommit("radius", val)}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setShowExport(true)}
              className="w-full py-2.5 px-4 rounded-md flex items-center justify-center gap-2 font-bold shadow-lg transition-all active:scale-[0.98] hover:opacity-90"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primaryForeground)",
                borderRadius: "var(--radius)",
              }}
            >
              <Download size={18} />
              Export Config
            </button>
          </div>
        </div>
      </aside>

      <main
        className={`flex-1 flex flex-col overflow-hidden ${mode === "dark" ? "bg-slate-950/40" : "bg-slate-100/50"}`}
      >
        <header
          className="h-16 border-b flex items-center justify-between px-8 shrink-0 transition-all"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--background)",
          }}
        >
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <AIHeader apiKey={import.meta.env.VITE_GROQ_API_KEY || ""} onApply={handleAITheme} />
          </div>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 p-1 rounded-lg"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <button
                onClick={handleUndo}
                disabled={!canUndo()}
                className="p-1.5 opacity-40 hover:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed transition-opacity"
              >
                <Undo2 size={16} />
              </button>
              <button
                onClick={handleRedo}
                disabled={!canRedo()}
                className="p-1.5 opacity-40 hover:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed transition-opacity"
              >
                <Redo2 size={16} />
              </button>
            </div>
            <div
              className="w-8 h-8 rounded-full shadow-md"
              style={{ background: `linear-gradient(135deg, var(--primary), var(--accent))` }}
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {renderPage()}
          </div>
        </div>
      </main>

      {showExport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowExport(false)}
        >
          <div
            className="w-full max-w-2xl mx-4 p-6 border shadow-2xl"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Export CSS Variables</h2>
              <button
                onClick={() => setShowExport(false)}
                className="p-1 hover:bg-black/10 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setExportMode("dark")}
                className={`px-3 py-1.5 text-xs font-bold rounded ${exportMode === "dark" ? "" : "opacity-50"}`}
                style={{
                  backgroundColor: exportMode === "dark" ? darkTheme.primary : "transparent",
                  color: exportMode === "dark" ? darkTheme.primaryForeground : "inherit",
                  border: `1px solid ${darkTheme.border}`,
                }}
              >
                Dark
              </button>
              <button
                onClick={() => setExportMode("light")}
                className={`px-3 py-1.5 text-xs font-bold rounded ${exportMode === "light" ? "" : "opacity-50"}`}
                style={{
                  backgroundColor: exportMode === "light" ? lightTheme.primary : "transparent",
                  color: exportMode === "light" ? lightTheme.primaryForeground : "inherit",
                  border: `1px solid ${lightTheme.border}`,
                }}
              >
                Light
              </button>
              <button
                onClick={() => setExportMode("both")}
                className={`px-3 py-1.5 text-xs font-bold rounded ${exportMode === "both" ? "" : "opacity-50"}`}
                style={{
                  backgroundColor: exportMode === "both" ? theme.primary : "transparent",
                  color: exportMode === "both" ? theme.primaryForeground : "inherit",
                  border: `1px solid ${theme.border}`,
                }}
              >
                Both
              </button>
            </div>
            <textarea
              readOnly
              value={generateCSS()}
              className="w-full h-64 p-4 text-sm font-mono border rounded-md resize-none"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={copyToClipboard}
                className="flex-1 py-2.5 px-4 rounded-md flex items-center justify-center gap-2 font-bold transition-all hover:opacity-90"
                style={{
                  backgroundColor: copied ? "#22c55e" : "var(--primary)",
                  color: "var(--primaryForeground)",
                  borderRadius: "var(--radius)",
                }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
