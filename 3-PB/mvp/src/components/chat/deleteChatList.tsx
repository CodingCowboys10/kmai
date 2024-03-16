import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useChatsData } from "@/providers/chats-provider";

function DeleteChatList() {
  const { setChatSessionNumber } = useChatsData();

  const handleDeleteAllChat = async () => {
    const res = await fetch("/api/chats/deleteAllChat", {
      method: "POST",
    });
    setChatSessionNumber(null);
    if (!res.ok) {
      toast.error((await res.json()).message);
    } else {
      toast.success((await res.json()).message);
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
