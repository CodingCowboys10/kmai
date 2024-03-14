import * as React from "react";

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

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `thread numero ${a.length - i}`
);

export function ChatThreads() {
  return (
    <ScrollArea className="h-full w-full rounded-md border">
      <div className="p-3">
        <div className="mb-2 flex flex-col items-center justify-center">
          <Button
            variant="outline"
            className="bg-sky-700 hover:bg-sky-400 transition-colors mb-2"
          >
            Nuova chat
          </Button>
        </div>
        <h4 className="mb-4 text-sm font-medium leading-none">Threads</h4>

        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="border-solid border-2 text-sm transition-colors hover:bg-slate-400 rounded-md">
              <Button
                variant="ghost"
                onClick={() => {
                  console.log(tag);
                }}
                className="bg-transparent hover:bg-transparent transition-colors"
              >
                {tag}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger>...</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Elimina chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Separator className="my-1" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
