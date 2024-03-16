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

export default function Page() {
  const [chatSessionId, setChatSessionId] = useState<number | null>(0);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [chatSessionNumber, setChatSessionNumber] = useState(null);
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
      let newMessages = messages.slice(-2);
      const keys = Object.keys(sourcesForMessages);
      const res = await fetch("/api/chats/uploadMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageAI: newMessages[1],
          messageUser: newMessages[0],
          sessionId: chatSessionId,
          source: sourcesForMessages[keys[keys.length - 1]],
        }),
      });
      const resData = await res.json();

      if (!res.ok) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message);
      }
    };
    if (!isLoading && messages.length) {
      console.log("Salvo messaggi");
      handleUploadMessage().then();
    }
  }, [isLoading]);

  useEffect(() => {
    const getMessage = async () => {
      const res = await fetch("/api/chats/getMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: chatSessionId }),
      });

      return (await res.json()).messages;
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
      <SideBar isChat={true}>
        <ChatList
          chatSessionId={chatSessionId}
          chatSessionNumber={chatSessionNumber}
          setChatSessionId={setChatSessionId}
          setChatSessionNumber={setChatSessionNumber}
        ></ChatList>
      </SideBar>

      <Body>
        <ChatMessages
          sources={sourcesForMessages}
          messages={messages}
        ></ChatMessages>
        <ChatForm
          chatSessionId={chatSessionId}
          setChatSessionId={setChatSessionId}
          setChatSessionNumber={setChatSessionNumber}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
          input={input}
        ></ChatForm>
      </Body>
    </main>
  );
}
