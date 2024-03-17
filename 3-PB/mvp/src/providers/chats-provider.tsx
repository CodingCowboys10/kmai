import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMessages } from "@/serverActions/chats/getMessages";
import { toast } from "sonner";
import { useMessagesData } from "@/providers/messages-provider";
import { getChats } from "@/serverActions/chats/getChats";

interface ChatsContextProps {
  setChatSessionId: Dispatch<SetStateAction<number | null>>;
  setChatSessionNumber: Dispatch<SetStateAction<number | null>>;
  setIsLoadingChat: Dispatch<SetStateAction<boolean>>;
  setTitles: Dispatch<SetStateAction<Record<any, any>[] | undefined>>;
  chatSessionId: number | null;
  chatSessionNumber: number | null;
  isLoadingChat: boolean;
  titles: Record<any, any>[] | undefined;
}

export const ChatsContext = createContext<ChatsContextProps>({
  setChatSessionId: () => {},
  setChatSessionNumber: () => {},
  setIsLoadingChat: () => {},
  setTitles: () => {},
  chatSessionId: null,
  chatSessionNumber: null,
  isLoadingChat: false,
  titles: [],
});
export function ChatsProvider({ children }: { children: ReactNode }) {
  const { isLoading, setMessages, setInitialMessages } = useMessagesData();
  const [chatSessionId, setChatSessionId] = useState<number | null>(0);
  const [chatSessionNumber, setChatSessionNumber] = useState<number | null>(
    null,
  );
  const [isLoadingChat, setIsLoadingChat] = useState(true);
  const [titles, setTitles] = useState<Record<any, any>[]>();

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

  useEffect(() => {
    const fetchTitles = async () => {
      const { number, titles } = await getChats();
      setChatSessionNumber(number);
      setTitles(titles);
      setIsLoadingChat(false);
    };
    fetchTitles().then(() => setIsLoadingChat(false));
  }, [chatSessionNumber]);

  return (
    <ChatsContext.Provider
      value={{
        setChatSessionId,
        setChatSessionNumber,
        chatSessionId,
        chatSessionNumber,
        isLoadingChat,
        setIsLoadingChat,
        titles,
        setTitles,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}

export function useChatsData(): ChatsContextProps {
  return useContext(ChatsContext);
}
