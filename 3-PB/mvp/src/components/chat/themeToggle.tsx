import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { useState } from "react";

function ThemeToggle() {
  const [model, setModel] = useState("OpenAi");
  return (
    <div className={"flex flex-row items-center justify-between"}>
      <h2>Modello</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-start">
            {model === "OpenAi" && (
              <div className=" flex justify-between gap-3  w-full scale-0 dark:scale-100">
                <p>OpenAi</p>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            )}
            {model === "Ollama" && (
              <div className=" flex justify-between gap-3  w-full scale-0 dark:scale-100">
                <p>Ollama</p>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-5">
          <DropdownMenuItem onClick={() => setModel("OpenAi")}>
            <p>OpenAi</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModel("Ollama")}>
            <p>Ollama</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ThemeToggle;
