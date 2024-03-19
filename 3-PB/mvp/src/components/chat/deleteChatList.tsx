import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
      // @ts-ignore
      toast.error(e.message);
    }
  };

  return (
    <div className={"flex items-center w-full justify-between mt-5"}>
      <h2>Elimina tutte le Conversazioni</h2>

      <AlertDialog>
      <AlertDialogTrigger className="rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 hover:bg-red-500">
        Elimina
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Conferma eliminazione.</AlertDialogTitle>
          <AlertDialogDescription>
            L'eliminazione delle sessioni è un'operazione irreversibile.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction
            className={
              "text-destructive-foreground bg-destructive hover:bg-destructive"
            }
            onClick={handleDeleteAllChat}
          >
            Elimina
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  );
}

export default DeleteChatList;
