import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Theme, ThemeMode } from "@/types/theme";

const MAX_HISTORY = 50;

export const darkThemeDefaults: Theme = {
  background: "#020617",
  foreground: "#f8fafc",
  card: "#0f172a",
  primary: "#ec4899",
  primaryForeground: "#ffffff",
  secondary: "#1e293b",
  secondaryForeground: "#f8fafc",
  accent: "#334155",
  accentForeground: "#f8fafc",
  border: "#1e293b",
  radius: "0.75",
};

export const lightThemeDefaults: Theme = {
  background: "#ffffff",
  foreground: "#020617",
  card: "#f8fafc",
  primary: "#ec4899",
  primaryForeground: "#ffffff",
  secondary: "#f1f5f9",
  secondaryForeground: "#020617",
  accent: "#e2e8f0",
  accentForeground: "#020617",
  border: "#e2e8f0",
  radius: "0.75",
};

interface HistoryState {
  history: Theme[];
  historyIndex: number;
}

interface ThemeStore {
  darkTheme: Theme;
  lightTheme: Theme;
  mode: ThemeMode;
  darkHistory: HistoryState;
  lightHistory: HistoryState;
  setTheme: (partial: Partial<Theme>) => void;
  reset: () => void;
  toggleMode: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const useThemeStore = create<ThemeStore>()(
  immer((set, get) => ({
    darkTheme: darkThemeDefaults,
    lightTheme: lightThemeDefaults,
    mode: "dark",
    darkHistory: { history: [deepClone(darkThemeDefaults)], historyIndex: 0 },
    lightHistory: { history: [deepClone(lightThemeDefaults)], historyIndex: 0 },

    setTheme: (partial) => set((state) => {
      const isDark = state.mode === "dark";
      const currentTheme = isDark ? state.darkTheme : state.lightTheme;
      const newTheme = { ...currentTheme, ...partial };
      
      const hist = isDark ? state.darkHistory : state.lightHistory;
      const newHistory = hist.history.slice(0, hist.historyIndex + 1);
      newHistory.push(deepClone(newTheme));
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      const newIndex = Math.min(hist.historyIndex + 1, newHistory.length - 1);
      
      if (isDark) {
        state.darkTheme = deepClone(newTheme);
        state.darkHistory = { history: newHistory, historyIndex: newIndex };
      } else {
        state.lightTheme = deepClone(newTheme);
        state.lightHistory = { history: newHistory, historyIndex: newIndex };
      }
    }),

    reset: () => set((state) => {
      const isDark = state.mode === "dark";
      const defaults = isDark ? darkThemeDefaults : lightThemeDefaults;
      
      const hist = isDark ? state.darkHistory : state.lightHistory;
      const newHistory = hist.history.slice(0, hist.historyIndex + 1);
      newHistory.push(deepClone(defaults));
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      const newIndex = Math.min(hist.historyIndex + 1, newHistory.length - 1);
      
      if (isDark) {
        state.darkTheme = deepClone(defaults);
        state.darkHistory = { history: newHistory, historyIndex: newIndex };
      } else {
        state.lightTheme = deepClone(defaults);
        state.lightHistory = { history: newHistory, historyIndex: newIndex };
      }
    }),

    toggleMode: () => set((state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    }),

    undo: () => set((state) => {
      const isDark = state.mode === "dark";
      const hist = isDark ? state.darkHistory : state.lightHistory;
      
      if (hist.historyIndex > 0) {
        const newIndex = hist.historyIndex - 1;
        const theme = hist.history[newIndex];
        
        if (isDark) {
          state.darkTheme = deepClone(theme);
          state.darkHistory = { ...hist, historyIndex: newIndex };
        } else {
          state.lightTheme = deepClone(theme);
          state.lightHistory = { ...hist, historyIndex: newIndex };
        }
      }
    }),

    redo: () => set((state) => {
      const isDark = state.mode === "dark";
      const hist = isDark ? state.darkHistory : state.lightHistory;
      
      if (hist.historyIndex < hist.history.length - 1) {
        const newIndex = hist.historyIndex + 1;
        const theme = hist.history[newIndex];
        
        if (isDark) {
          state.darkTheme = deepClone(theme);
          state.darkHistory = { ...hist, historyIndex: newIndex };
        } else {
          state.lightTheme = deepClone(theme);
          state.lightHistory = { ...hist, historyIndex: newIndex };
        }
      }
    }),

    canUndo: () => {
      const state = get();
      const hist = state.mode === "dark" ? state.darkHistory : state.lightHistory;
      return hist.historyIndex > 0;
    },
    canRedo: () => {
      const state = get();
      const hist = state.mode === "dark" ? state.darkHistory : state.lightHistory;
      return hist.historyIndex < hist.history.length - 1;
    },
  }))
);
