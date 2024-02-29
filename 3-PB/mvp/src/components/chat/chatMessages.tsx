import Message from "@/components/chat/message";
import { Message as AiMessage } from "ai";

interface ChatMessagesInterface {
  messages: AiMessage[];
}

function ChatMessages({ messages }: ChatMessagesInterface) {
  messages = []; //In futuro da togliere e da modificare il diverso da zero nel messages.length != 0
  return (
    <div className={"flex flex-col gap-2 w-8/12 h-full px-2 overflow-scroll"}>
      {messages.length != 0 && (
        <div
          className={
            "text-[--text] opacity-40 font-medium text-2xl transition duration-300 ease-in flex flex-col items-center justify-center h-full w-full align"
          }
        >
          Icona di Coding Cowboys
        </div>
      )}
      {[...Array(2)].map((_, index) => (
        <div key={index}>
          <Message
            pageNumber={"Pag. 0-1"}
            documentLink={""}
            isGenerated={index % 2 !== 0}
          />
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
