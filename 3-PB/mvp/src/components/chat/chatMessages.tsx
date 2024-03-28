import Message from "@/components/chat/message";
import React from "react";
import { useMessagesData } from "@/providers/messages-provider";

function ChatMessages() {
  const { messages, sourcesForMessages } = useMessagesData();

  return (
    <div
      className={"flex flex-col gap-2 w-8/12 h-full pt-2 px-2 overflow-scroll"}
    >
      {messages.length == 0 && (
        <div
          className={
            "text-[--text] opacity-40 font-medium text-2xl transition duration-300 ease-in flex flex-col items-center justify-center h-full w-full align"
          }
        >
          Inizia una nuova conversazione
        </div>
      )}
      <div className="flex flex-col gap-5 ">
        {messages.map((value, index) => (
          <React.Fragment key={index}>
            {value.role !== "user" ? (
              <Message
                isGenerated={true}
                messageText={value.content}
                documentLink={
                  sourcesForMessages[value.id]?.[0]?.metadata?.name || ""
                }
                pageNumber={
                  sourcesForMessages[value.id]?.[0]?.metadata?.page || ""
                }
                time={value.createdAt!}
              />
            ) : (
              <Message
                isGenerated={false}
                messageText={value.content}
                time={value.createdAt!}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ChatMessages;
