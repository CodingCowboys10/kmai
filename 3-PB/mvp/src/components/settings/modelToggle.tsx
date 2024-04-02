import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { useModel } from "@/providers/model-provider";

function ModelToggle() {
  const { model, setModel } = useModel();
  return (
    <div className={"flex flex-row items-center justify-between"}>
      <h2>Modello</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild data-testid={"TriggerModel"}>
          <Button variant="outline" className="justify-start">
            {model === "OpenAi" && (
              <div className=" flex justify-between gap-3 w-full scale-100 dark:scale-100">
                <p className={"text-secondary-foreground"}>OpenAi</p>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            )}
            {model === "Ollama" && (
              <div className=" flex justify-between gap-3  w-full scale-100 dark:scale-100">
                <p className={"text-secondary-foreground"}>Ollama</p>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-5">
          <DropdownMenuItem onClick={() => setModel("OpenAi")}>
            <p className={"text-secondary-foreground"}>OpenAi</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setModel("Ollama")}
            disabled={process.env.NEXT_PUBLIC_HOSTED_VERSION !== "false"}
          >
            <p className={"text-secondary-foreground"}>Ollama</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ModelToggle;
