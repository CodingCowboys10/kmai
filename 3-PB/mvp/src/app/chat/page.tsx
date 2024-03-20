"use client";
import React from "react";
import Body from "@/components/body";
import SideBar from "@/components/sideBar";
import ChatMessages from "@/components/chat/chatMessages";
import ChatForm from "@/components/chat/chatForm";
import ChatList from "@/components/chat/chatList";
import { ChatsProvider } from "@/providers/chats-provider";
import { MessagesProvider } from "@/providers/messages-provider";

export default function App() {
  return (
    <ChatsProvider>
      <MessagesProvider>
        <Main />
      </MessagesProvider>
    </ChatsProvider>
  );
}

function Main() {
  return (
    <main className="relative flex flex-row w-full h-full">
      <SideBar isChat={true}>
        <ChatList></ChatList>
      </SideBar>
      <Body>
        <ChatMessages></ChatMessages>
        <ChatForm></ChatForm>
      </Body>
    </main>
  );
}
