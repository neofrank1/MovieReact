"use client";

import { useState } from "react";
import { Switch } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState(true);

  const handleChange = (isSelected: boolean) => {
    setIsDark(isSelected);

    document.documentElement.setAttribute(
      "data-theme",
      isSelected ? "dark" : "light"
    );
  };

  return (
    <Switch
      defaultSelected
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