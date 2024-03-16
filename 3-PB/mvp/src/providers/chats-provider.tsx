import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface ChatsContextProps {
  setChatSessionId: Dispatch<SetStateAction<number | null>>;
  setChatSessionNumber: Dispatch<SetStateAction<number | null>>;
  chatSessionId: number | null;
  chatSessionNumber: number | null;
}

export const ChatsContext = createContext<ChatsContextProps>({
  setChatSessionId: () => {},
  setChatSessionNumber: () => {},
  chatSessionId: null,
  chatSessionNumber: null,
});
export function ChatsProvider({ children }: { children: ReactNode }) {
  const [chatSessionId, setChatSessionId] = useState<number | null>(0);
  const [chatSessionNumber, setChatSessionNumber] = useState<number | null>(
    null,
  );

  return (
    <ChatsContext.Provider
      value={{
        setChatSessionId,
        setChatSessionNumber,
        chatSessionId,
        chatSessionNumber,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}

export function useChatsData(): ChatsContextProps {
  return useContext(ChatsContext);
}
