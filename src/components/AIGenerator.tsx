import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

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

type AIGeneratorProps = {
  onApply: (dark: GeneratedTheme, light: GeneratedTheme) => void;
  apiKey: string;
};

export function AIGenerator({ onApply, apiKey }: AIGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateTheme = async () => {
    if (!prompt.trim() || !apiKey) return;
    
    setLoading(true);
    setError(null);

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
            {
              role: "system",
              content: "You are a UI theme designer. Return only valid JSON, no markdown."
            },
            {
              role: "user",
              content: PROMPT_TEMPLATE.replace("{prompt}", prompt)
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      let jsonStr = content.trim();
      if (jsonStr.startsWith("```json")) jsonStr = jsonStr.slice(7);
      else if (jsonStr.startsWith("```")) jsonStr = jsonStr.slice(3);
      if (jsonStr.endsWith("```")) jsonStr = jsonStr.slice(0, -3);

      const theme: ThemeResult = JSON.parse(jsonStr.trim());
      
      onApply(theme.dark, theme.light);
      setPrompt("");
    } catch (err) {
      setError("Failed to generate theme. Check API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!apiKey) {
    return (
      <div className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-40">
          AI Theme Generator
        </h3>
        <p className="text-[10px] opacity-50">Add GROQ_API_KEY to use AI</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
      <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-40">
        AI Theme Generator
      </h3>
      <div className="space-y-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && generateTheme()}
          placeholder="e.g. Cyberpunk neon, Ocean sunset..."
          className="w-full bg-transparent border rounded-md px-3 py-2 text-xs outline-none focus:ring-1"
          style={{ 
            borderColor: "var(--border)",
            backgroundColor: "var(--card)",
            color: "var(--foreground)"
          }}
        />
        <button
          onClick={generateTheme}
          disabled={loading || !prompt.trim()}
          className="w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primaryForeground)",
            borderRadius: "var(--radius)",
          }}
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={14} />
              Generate with AI
            </>
          )}
        </button>
        {error && (
          <p className="text-[10px] text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}
