import { useState, useEffect } from "react";

type RadiusSliderProps = {
  value: string;
  onCommit: (value: string) => void;
};

export function RadiusSlider({ value, onCommit }: RadiusSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onCommit(localValue);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [localValue, value, onCommit]);

  const numValue = parseFloat(localValue) || 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs opacity-70">
        <span>Border Radius</span>
        <span>{numValue.toFixed(2)}rem</span>
      </div>
      <input
        type="range"
        min="0"
        max="1.5"
        step="0.05"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
