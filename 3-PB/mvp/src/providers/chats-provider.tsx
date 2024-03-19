import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getChats } from "@/serverActions/chats/getChats";
import { addChat } from "@/serverActions/chats/addChat";
import { toast } from "sonner";

interface ChatsContextProps {
  setChatSessionId: Dispatch<SetStateAction<number | null>>;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  setIsLoadingChat: Dispatch<SetStateAction<boolean>>;
  setTitles: Dispatch<SetStateAction<Record<any, any>[] | undefined>>;
  chatSessionId: number | null;

  isLoadingChat: boolean;
  titles: Record<any, any>[] | undefined;
}

export const ChatsContext = createContext<ChatsContextProps>({
  setChatSessionId: () => {},
  setIsUpdate: () => {},
  setIsLoadingChat: () => {},
  setTitles: () => {},
  chatSessionId: null,
  isLoadingChat: false,
  titles: [],
});
export function ChatsProvider({ children }: { children: ReactNode }) {
  const [chatSessionId, setChatSessionId] = useState<number | null>(null);
  const [isUpdate, setIsUpdate] = useState(true);
  const [isLoadingChat, setIsLoadingChat] = useState(true);
  const [titles, setTitles] = useState<Record<any, any>[]>();

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const titles = await getChats();
        setTitles(titles);
      } catch (e) {
        setTitles([]);
        // @ts-ignore
        toast.error(e.message);
      }
    };
    if (isUpdate)
      fetchTitles().then(() => {
        setIsUpdate(false);
        setIsLoadingChat(false);
      });
  }, [isUpdate]);

  return (
    <ChatsContext.Provider
      value={{
        setChatSessionId,
        setIsUpdate,
        chatSessionId,
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
