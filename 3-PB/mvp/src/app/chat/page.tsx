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
    <MessagesProvider>
      <ChatsProvider>
        <Main />
      </ChatsProvider>
    </MessagesProvider>
  );
}

function Main() {
  const { chatSessionId } = useChatsData();
  const { messages, sourcesForMessages, isLoading } = useMessagesData();

  useEffect(() => {
    const handleUploadMessage = async () => {
      try {
        let newMessages = messages.slice(-2);
        const keys = Object.keys(sourcesForMessages);
        await uploadMessages({
          messageAI: newMessages[1],
          messageUser: newMessages[0],
          sessionId: chatSessionId,
          source: sourcesForMessages[keys[keys.length - 1]],
        });
      } catch (e) {
        // @ts-ignore
        toast.error(e.message);
      }
    };
    if (!isLoading && messages.length && chatSessionId) {
      console.log("Salvo messaggi");
      handleUploadMessage().then();
    }
  }, [isLoading]);

  return (
    <main className="relative flex flex-row w-full h-full">
      <SideBar>
        <ChatList></ChatList>
      </SideBar>
      <Body>
        <ChatMessages></ChatMessages>
        <ChatForm></ChatForm>
      </Body>
    </main>
  );
}
