import Message from "@/components/chat/message";
import { Message as AiMessage } from "ai";
import React from "react";

interface ChatMessagesInterface {
  messages: AiMessage[];
}

function ChatMessages({ messages }: ChatMessagesInterface) {
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
          Icona di Coding Cowboys
        </div>
      )}
      <div className="flex flex-col gap-5 ">
        {messages.map((value, index) => (
          <React.Fragment key={index}>
            {value.role !== "user" ? (
              <Message
                isGenerated={true}
                messageText={value.content}
                documentLink={""}
                pageNumber={""}
                time={new Date().toLocaleTimeString([], {
                  hour12: false,
                  minute: "2-digit",
                  hour: "2-digit",
                })}
              />
            ) : (
              <Message
                isGenerated={false}
                messageText={value.content}
                time={new Date().toLocaleTimeString([], {
                  hour12: false,
                  minute: "2-digit",
                  hour: "2-digit",
                })}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ChatMessages;
