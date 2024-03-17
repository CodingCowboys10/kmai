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

export default function App() {
  return (
    <ChatsProvider>
      <Main />
    </ChatsProvider>
  );
}

function Main() {
  const { chatSessionId } = useChatsData();
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    initialMessages: initialMessages,
    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : [];
      const messageIndexHeader = response.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        });
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

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

  useEffect(() => {
    const getMessage = async () => {
      try {
        return await getMessages(chatSessionId);
      } catch (e) {
        // @ts-ignore
        toast.error(e.message);
        return [];
      }
    };
    if (!isLoading) {
      getMessage().then((chatHistory) => {
        setInitialMessages(chatHistory);
        setMessages(chatHistory);
      });
    }
  }, [chatSessionId]);

  return (
    <main className="relative flex flex-row w-full h-full">
      <SideBar>
        <ChatList></ChatList>
      </SideBar>
      <Body>
        <ChatMessages
          sources={sourcesForMessages}
          messages={messages}
        ></ChatMessages>
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
