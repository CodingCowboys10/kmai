"use client";
import React, { useState } from "react";
import Body from "@/components/body";
import SideBar from "@/components/sideBar";
import ChatMessages from "@/components/chat/chatMessages";
import ChatForm from "@/components/chat/chatForm";
import { useChat } from "ai/react";
import { toast } from "sonner";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      onResponse: (res: Response) => {
        if (!res.ok) {
          res.json().then((data) => {
            toast.error(data.error);
          });
        }
      },
    });

  return (
    <main className="relative flex flex-row w-full h-full">
      <SideBar>{""}</SideBar>
      <Body>
        <ChatMessages messages={messages}></ChatMessages>
        <ChatForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
          input={input}
        ></ChatForm>
      </Body>
    </main>
  );
}
