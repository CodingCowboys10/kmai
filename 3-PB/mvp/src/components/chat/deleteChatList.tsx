import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useChatsData } from "@/providers/chats-provider";
import { deleteAllChat } from "@/serverActions/chats/deleteAllChat";

function DeleteChatList() {
  const { setIsUpdate, setChatSessionId } = useChatsData();

  const handleDeleteAllChat = async () => {
    try {
      await deleteAllChat();
      setIsUpdate(true);
      setChatSessionId(null);
    } catch (e) {
      toast.error("Errore durante la eliminazione");
    }
  };

  return (
    <div className={"flex items-center w-full justify-between mt-5"}>
      <h2>Elimina tutte le Conversazioni</h2>

      <Button variant={"destructive"} onClick={handleDeleteAllChat}>
        Distruggi
      </Button>
    </div>
  );
}

export default DeleteChatList;
