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
import { DocumentInfo } from "@/components/documents/docContent";
import { getDocument } from "@/serverActions/document/getDocument";
import { useModel } from "@/providers/model-provider";

interface DocumentContextProps {
  data: DocumentInfo[];
  setData: Dispatch<SetStateAction<DocumentInfo[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
}

export const DocumentContext = createContext<DocumentContextProps>({
  data: [],
  setData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  setIsUpdate: () => {},
});
export function DocumentProvider({ children }: { children: ReactNode }) {
  const { model } = useModel();
  const [data, setData] = useState<DocumentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await getDocument(model!);
        setData(res);
      } catch (e) {
        setData([]);
        // @ts-ignore
        toast.error(e.message);
      }
    };
    fetchDocuments().then(() => setIsLoading(false));
  }, [model]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await getDocument(model!);
        setData(res);
      } catch (e) {
        setData([]);
        // @ts-ignore
        toast.error(e.message);
      }
    };
    if (isUpdate) fetchDocuments().then(() => setIsUpdate(false));
  }, [isUpdate]);

  return (
    <DocumentContext.Provider
      value={{
        data,
        setData,
        isLoading,
        setIsLoading,
        setIsUpdate,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocumentData(): DocumentContextProps {
  return useContext(DocumentContext);
}
