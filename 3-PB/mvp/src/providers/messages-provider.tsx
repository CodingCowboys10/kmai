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
import { getChatMessages } from "@/serverActions/chats/getChatMessages";
import { useChatsData } from "@/providers/chats-provider";
import { addChatMessages } from "@/serverActions/chats/addChatMessages";

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
  const { chatSessionId, setIsUpdate } = useChatsData();
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});
  const [sourceCurrent, setSourceCurrent] = useState<any>({});
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
        setSourceCurrent({ ...sources });
      }
    },
    async onFinish() {
      setIsUpdate(true);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  useEffect(() => {
    const handleUploadMessage = async () => {
      try {
        let newMessages = messages.slice(-2);
        setSourcesForMessages({
          ...sourcesForMessages,
          [newMessages[1].id]: sourceCurrent,
        });
        await addChatMessages({
          messageAI: newMessages[1],
          messageUser: newMessages[0],
          sessionId: chatSessionId,
          source: sourceCurrent,
        });
      } catch (e) {
        // @ts-ignore
        toast.error(e.message);
      }
    };
    if (!isLoading && messages.length && chatSessionId) {
      handleUploadMessage().then();
    }
  }, [isLoading]);

  useEffect(() => {
    console.log("get message", sourcesForMessages);
    const getMessage = async () => {
      try {
        const { allMessages, source } = await getChatMessages(chatSessionId);

        return { allMessages, source };
      } catch (e) {
        // @ts-ignore
        toast.error(e.message);
        return { allMessages: [], source: null };
      }
    };
    if (!isLoading) {
      getMessage().then(({ allMessages, source }) => {
        setSourcesForMessages({ ...source });

        setInitialMessages(allMessages);
        setMessages(allMessages);
      });
    }
  }, [chatSessionId]);

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
