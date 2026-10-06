"use client";

import { useEffect, useState } from "react";
import { Switch } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

const THEME_STORAGE_KEY = "theme";

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
}

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const syncTheme = (theme: "light" | "dark") => {
      applyTheme(theme);
      setIsDark(theme === "dark");
    };

    syncTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;

      syncTheme(event.newValue === "dark" ? "dark" : "light");
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleChange = (isSelected: boolean) => {
    setIsDark(isSelected);
    const theme = isSelected ? "dark" : "light";

    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  };

  return (
    <Switch
      isSelected={isDark}
      onChange={handleChange}
      aria-label="Toggle dark mode"
      size="lg"
    >
      {({ isSelected }) => (
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb>
              <Switch.Icon>
                {isSelected ? (
                  <Moon className="size-3 text-inherit opacity-100" />
                ) : (
                  <Sun className="size-3 text-inherit opacity-70" />
                )}
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </Switch.Content>
      )}
    </Switch>
  );
}
