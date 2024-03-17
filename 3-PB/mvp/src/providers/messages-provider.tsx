import {
  ChangeEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Message } from "ai";
import { useChat } from "ai/react";
import { toast } from "sonner";

interface MessagesContextProps {
  setInitialMessages: Dispatch<SetStateAction<Message[]>>;
  initialMessages: Message[];
  sourcesForMessages: Record<string, any>;
  setSourcesForMessages: Dispatch<SetStateAction<Message[]>>;
  messages: Message[];
  setMessages: any;
  input: string;
  isLoading: boolean;
  handleInputChange: any;
  handleSubmit: any;
}

export const MessagesContext = createContext<MessagesContextProps>({
  setInitialMessages: () => {},
  setSourcesForMessages: () => {},
  initialMessages: [],
  sourcesForMessages: {},
  messages: [],
  setMessages: () => {},
  input: "",
  isLoading: false,
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {},
  handleSubmit: () => {},
});
export function MessagesProvider({ children }: { children: ReactNode }) {
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

  return (
    <MessagesContext.Provider
      value={{
        initialMessages,
        setInitialMessages,
        sourcesForMessages,
        setSourcesForMessages,
        messages,
        setMessages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessagesData(): MessagesContextProps {
  return useContext(MessagesContext);
}
