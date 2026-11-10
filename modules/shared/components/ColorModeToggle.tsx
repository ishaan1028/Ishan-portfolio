"use client";

import { Button } from "@ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
import { Icon } from "@ui/components/icon";
import { useTheme } from "next-themes";

const colorModeOptions = [
  { value: "system", label: "System", icon: Icon.system },
  { value: "light", label: "Light", icon: Icon.lightMode },
  { value: "dark", label: "Dark", icon: Icon.darkMode },
];

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change color theme">
          {/* Picked by the `dark` class next-themes sets before first paint,
              so the button renders on the server with no flash or shift. */}
          <Icon.lightMode className="h-4 w-4 dark:hidden" />
          <Icon.darkMode className="hidden h-4 w-4 dark:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={theme ?? "system"}
          onValueChange={setTheme}
        >
          {colorModeOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              <option.icon className="mr-2 h-4 w-4 opacity-50" />{" "}
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
