import * as React from "react";

import { Pencil2Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import pool from "@/app/api/chat/chatThread";
import { Label } from "@/components/ui/label";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `thread numero ${a.length - i}`,
);

export function ChatThreads() {
  return (
    <div className={"flex flex-col  relative max-h-[90%] px-1"}>
      <div className={"flex flex-row items-center justify-between p-2"}>
        <Label className={"text-lg"}>Nuova Chat</Label>
        <Button variant={"ghost"} size={"icon"}>
          <Pencil2Icon className={"w-6 h-6"} />
        </Button>
      </div>
      <ScrollArea className="h-full max-h-[80%] rounded-md p-2">
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div
              onClick={() => alert("ciao")}
              className="flex flex-row items-center justify-between text-sm transition-colors  hover:bg-background/50 rounded-md p-2 my-1"
            >
              {tag}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"icon"} className={"w-7 h-7"}>
                    <DotsHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Elimina chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </React.Fragment>
        ))}
      </ScrollArea>
    </div>
  );
}
