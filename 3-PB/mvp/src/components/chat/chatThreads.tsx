import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `thread numero ${a.length - i}`
);

export function ChatThreads() {
  return (
    <ScrollArea className="h-full w-full rounded-md border">
      <div className="p-3">
        <div className="mb-2 flex justify-between items-center">
          <h4 className=" text-sm font-medium leading-none">Threads</h4>
          <Button variant="outline" className="bg-sky-700 hover:bg-sky-400">
            Nuova chat
          </Button>
        </div>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">
              <Button
                variant="ghost"
                className="transition-colors duration-150 ease-in-out hover:bg-slate-400"
              >
                {tag}
              </Button>
            </div>
            <Separator className="my-1" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
