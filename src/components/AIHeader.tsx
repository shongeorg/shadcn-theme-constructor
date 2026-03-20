import { useState } from "react";
import { Sparkles, Loader2, X } from "lucide-react";

const PROMPT_TEMPLATE = `Generate a dark and light theme based on: "{prompt}"

Return ONLY a JSON object with dark and light theme colors:
{"dark":{"background":"#hex","foreground":"#hex","card":"#hex","primary":"#hex","primaryForeground":"#hex","secondary":"#hex","secondaryForeground":"#hex","accent":"#hex","accentForeground":"#hex","border":"#hex"},"light":{"background":"#hex","foreground":"#hex","card":"#hex","primary":"#hex","primaryForeground":"#hex","secondary":"#hex","secondaryForeground":"#hex","accent":"#hex","accentForeground":"#hex","border":"#hex"}}`;

type GeneratedTheme = {
  background: string;
  foreground: string;
  card: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
};

type ThemeResult = {
  dark: GeneratedTheme;
  light: GeneratedTheme;
};

type AIHeaderProps = {
  onApply: (dark: Partial<GeneratedTheme>, light: Partial<GeneratedTheme>) => void;
  apiKey: string;
};

export function AIHeader({ onApply, apiKey }: AIHeaderProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const generateTheme = async () => {
    if (!prompt.trim() || !apiKey) return;
    
    setLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You are a UI theme designer. Return only valid JSON, no markdown." },
            { role: "user", content: PROMPT_TEMPLATE.replace("{prompt}", prompt) }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      let jsonStr = content.trim();
      if (jsonStr.startsWith("```json")) jsonStr = jsonStr.slice(7);
      else if (jsonStr.startsWith("```")) jsonStr = jsonStr.slice(3);
      if (jsonStr.endsWith("```")) jsonStr = jsonStr.slice(0, -3);

      const theme: ThemeResult = JSON.parse(jsonStr.trim());
      onApply(theme.dark, theme.light);
      setPrompt("");
      setShow(false);
    } catch (err) {
      console.error("Failed to generate theme");
    } finally {
      setLoading(false);
    }
  };

  if (!apiKey) return null;

  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm opacity-60 hover:opacity-100 transition-opacity"
        style={{ backgroundColor: "var(--accent)" }}
      >
        <Sparkles size={16} />
        <span>AI Theme</span>
      </button>
    );
  }

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg flex-1"
      style={{ backgroundColor: "var(--accent)" }}
    >
      <Sparkles size={16} className="shrink-0" style={{ color: "var(--primary)" }} />
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !loading && generateTheme()}
        placeholder="Describe your theme... (e.g. Cyberpunk neon)"
        className="flex-1 bg-transparent outline-none text-sm"
        style={{ color: "var(--foreground)" }}
        autoFocus
      />
      {loading ? (
        <Loader2 size={16} className="animate-spin shrink-0" />
      ) : (
        <button
          onClick={generateTheme}
          disabled={!prompt.trim()}
          className="shrink-0 p-1 rounded hover:bg-white/10 disabled:opacity-30"
          style={{ color: "var(--primary)" }}
        >
          <Sparkles size={16} />
        </button>
      )}
      <button
        onClick={() => { setShow(false); setPrompt(""); }}
        className="shrink-0 p-1 rounded hover:bg-white/10 opacity-60"
      >
        <X size={14} />
      </button>
    </div>
  );
}
