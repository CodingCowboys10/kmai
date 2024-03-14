"use client";
import React, { useEffect, useState } from "react";
import Body from "@/components/body";
import SideBar from "@/components/sideBar";
import ChatMessages from "@/components/chat/chatMessages";
import ChatForm from "@/components/chat/chatForm";
import { useChat } from "ai/react";
import { toast } from "sonner";
import Link from "next/link";

export default function Page() {
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

  return (
    <main className="relative flex flex-row w-full h-full">
      <SideBar>
        <Link href={"documents"}>CHAT</Link>
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
