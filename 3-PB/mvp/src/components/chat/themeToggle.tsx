import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={"flex flex-row items-center justify-between"}>
      <h2>Tema</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-start">
            {theme === "light" && (
              <div className="flex justify-between gap-3 w-full scale-100 dark:scale-0">
                <SunIcon className="w-5 h-5" />
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            )}
            {theme === "dark" && (
              <div className=" flex justify-between gap-3  w-full scale-0 dark:scale-100">
                <MoonIcon className="w-5 h-5" />
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-5">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <SunIcon className="w-5 h-5" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <MoonIcon className="w-5 h-5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ThemeToggle;
