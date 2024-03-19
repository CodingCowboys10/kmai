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
import { toast } from "sonner";
import { useChatsData } from "@/providers/chats-provider";
import { addChat } from "@/serverActions/chats/addChat";
import { deleteChat } from "@/serverActions/chats/deleteChat";
import { getChats } from "@/serverActions/chats/getChats";
import { useMessagesData } from "@/providers/messages-provider";

function ChatList() {
  const { isLoading } = useMessagesData();

  const {
    isLoadingChat,
    chatSessionId,
    setChatSessionId,
    titles,
    setIsUpdate,
  } = useChatsData();

  const handleCreateChat = async () => {
    try {
      setChatSessionId(null);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteChat = async (id: number) => {
    try {
      await deleteChat(id);

      setChatSessionId(null);
      setIsUpdate(true);
    } catch (e) {
      toast.error("Errore durante l'eliminazione della chat");
    }
  };

  return (
    <div className={"flex flex-col relative min-h-[90%] px-1"}>
      <div className={"flex flex-row items-center justify-between p-2"}>
        <Label className={"text-lg"}>Nuova Chat</Label>
        <Button variant={"ghost"} size={"icon"} onClick={handleCreateChat}>
          <Pencil2Icon className={"w-6 h-6"} />
        </Button>
      </div>
      <ScrollArea className="h-full max-h-[80%] rounded-md p-2 ">
        {isLoadingChat && (
          <div className={"space-y-2"}>
            <Skeleton className={"h-10 bg-background/65"} />{" "}
            <Skeleton className={"h-10 bg-background/55"} />{" "}
            <Skeleton className={"h-10 bg-background/45"} />{" "}
            <Skeleton className={"h-10 bg-background/35"} />{" "}
            <Skeleton className={"h-10 bg-background/25"} />{" "}
          </div>
        )}
        {!isLoadingChat &&
          titles!.map((value, index) => (
            <React.Fragment key={index}>
              <div
                className={`flex flex-row items-center justify-between text-sm transition-colors hover:bg-background/50 rounded-md my-1 mr-2 pr-2 
                ${chatSessionId === value.id ? "bg-background/75 hover:bg-background/70" : ""}`}
              >
                <div
                  onClick={() => {
                    if (!isLoading) setChatSessionId(value.id);
                  }}
                  className={"w-full h-full cursor-pointer p-3 "}
                >
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
export default ChatList;
