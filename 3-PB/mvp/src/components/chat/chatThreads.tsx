import * as React from "react";

import { Pencil2Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Message } from "ai";
import { toast } from "sonner";

function ChatThreads({
  chatSessionId,
  setChatSessionId,
}: {
  chatSessionId: number | null;
  setChatSessionId: any;
}) {
  const [chatSessionNumber, setChatSessionNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [titles, setTitles] = useState<Record<any, any>[]>();

  const handleCountChats = async () => {
    const res = await fetch("/api/chats/getChatsNumber", { method: "POST" });
    const resData = await res.json();
    return { number: resData.number, titles: resData.titles };
  };
  const handleCreateChat = async () => {
    try {
      const res = await fetch("/api/chats/addChat", {
        method: "POST",
      });

      const resData = (await res.json()).id;
      setChatSessionId(resData);
      const { number } = await handleCountChats();
      setChatSessionNumber(number);

      if (!res.ok) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteChat = async (id: number) => {
    try {
      const res = await fetch("/api/chats/deleteChat", {
        method: "POST",
        body: JSON.stringify({ id: id }),
      });
      const resData = await res.json();
      setChatSessionId(resData.id || null);
      const { number } = await handleCountChats();
      setChatSessionNumber(number);

      if (!res.ok) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(chatSessionNumber);
    console.log(chatSessionId);
    const fetchTitles = async () => {
      const { number, titles } = await handleCountChats();
      setChatSessionNumber(number);
      setTitles(titles);
      setIsLoading(false);
    };
    fetchTitles().then(() => setIsLoading(false));
  }, [chatSessionNumber]);

  return (
    <div className={"flex flex-col relative min-h-[90%] px-1"}>
      <div className={"flex flex-row items-center justify-between p-2"}>
        <Label className={"text-lg"}>Nuova Chat</Label>
        <Button variant={"ghost"} size={"icon"} onClick={handleCreateChat}>
          <Pencil2Icon className={"w-6 h-6"} />
        </Button>
      </div>
      <ScrollArea className="h-full max-h-[80%] rounded-md p-2 ">
        {isLoading && (
          <div className={"space-y-2"}>
            <Skeleton className={"h-8 bg-background/60"} />{" "}
            <Skeleton className={"h-8 bg-background/45"} />{" "}
            <Skeleton className={"h-8 bg-background/30"} />{" "}
            <Skeleton className={"h-8 bg-background/15"} />{" "}
          </div>
        )}
        {!isLoading &&
          titles!.map((value, index) => (
            <React.Fragment key={index}>
              <div
                className={`flex flex-row items-center justify-between text-sm transition-colors hover:bg-background/50 rounded-md my-1 mr-2 pr-2 
                ${chatSessionId === value.id ? "bg-background/75 hover:bg-background/70" : ""}`}
              >
                <div
                  onClick={() => setChatSessionId(value.id)}
                  className={"w-full h-full cursor-pointer p-3 "}
                >
                  {value.id}
                  {value.title}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className={"w-7 h-7"}
                    >
                      <DotsHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleDeleteChat(value.id)}
                    >
                      Elimina chat
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </React.Fragment>
          ))}
      </ScrollArea>
    </div>
  );
}
export default ChatThreads;
