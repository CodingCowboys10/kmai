"use client";
import React, { useState } from "react";
import Body from "@/components/body";
import SideBar from "@/components/sideBar";
import ChatMessages from "@/components/chat/chatMessages";
import ChatForm from "@/components/chat/chatForm";
import { useChat } from "ai/react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({});

  return (
    <main className="relative flex flex-row w-full h-full">
      <SideBar>{""}</SideBar>
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
