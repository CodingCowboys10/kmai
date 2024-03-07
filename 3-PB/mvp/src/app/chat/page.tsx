"use client";
import React from "react";
import Body from "@/components/body";
import SideBar from "@/components/sideBar";
import ChatMessages from "@/components/chat/chatMessages";
import ChatForm from "@/components/chat/chatForm";
import { useChat } from "ai/react";
import { ChatThreads } from "@/components/chat/chatThreads";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({});
  return (
    <main className="flex flex-row w-full h-full">
      <SideBar>{<ChatThreads></ChatThreads>}</SideBar>
      <Body>
        <ChatMessages messages={messages}></ChatMessages>
        <ChatForm
          handleSubmit={handleSubmit}
          input={input}
          handleInputChange={handleInputChange}
        ></ChatForm>
      </Body>
    </main>
  );
}
