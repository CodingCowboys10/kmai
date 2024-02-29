"use client";
import ChatForm from "@/components/chat/chatForm";
import ChatMessages from "@/components/chat/chatMessages";
import { useChat, Message as AiMessage } from "ai/react";
function ChatBody() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({});

  return (
    <div
      className={"flex flex-col min-h-screen w-full p-2 gap-0.5 items-center"}
    >
      <ChatMessages messages={messages}></ChatMessages>
      <ChatForm
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
      ></ChatForm>
    </div>
  );
}
export default ChatBody;
