"use client";
import React, { useEffect, useState } from "react";
import Body from "@/components/body";
import SideBar from "@/components/sideBar";
import ChatMessages from "@/components/chat/chatMessages";
import ChatForm from "@/components/chat/chatForm";
import { useChat } from "ai/react";

import ChatThreads from "@/components/chat/chatThreads";

import { toast } from "sonner";

export default function Page() {
  const [chatSessionId, setChatSessionId] = useState<number | null>(0);

  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
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

      const res = await fetch("/api/chats/uploadMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageAI: newMessages[1],
          messageUser: newMessages[0],
          sessionId: chatSessionId,
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
      handleUploadMessage().then();
    }
  }, [messages, isLoading]);

  return (
    <main className="relative flex flex-row w-full h-full">
      <SideBar isChat={true}>
        <ChatThreads
          chatSessionId={chatSessionId}
          setChatSessionId={setChatSessionId}
        ></ChatThreads>
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
