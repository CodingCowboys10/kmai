"use client";
import React, { useEffect, useState } from "react";
import Body from "@/components/body";
import SideBar from "@/components/sideBar";
import ChatMessages from "@/components/chat/chatMessages";
import ChatForm from "@/components/chat/chatForm";
import { useChat } from "ai/react";

import ChatList from "@/components/chat/chatList";

import { toast } from "sonner";
import { Message } from "ai";
import { ChatsProvider, useChatsData } from "@/providers/chats-provider";
import { getMessages } from "@/serverActions/chats/getMessages";
import { uploadMessages } from "@/serverActions/chats/uploadMessages";
import {
  MessagesProvider,
  useMessagesData,
} from "@/providers/messages-provider";

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
