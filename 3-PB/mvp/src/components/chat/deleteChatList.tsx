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
import { Button } from "@/components/ui/button";

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
    <div className={"flex items-center w-full justify-between"}>
      <h2>Elimina tutte le Conversazioni</h2>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} data-testid={"TriggerDelete"}>Elimina</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione.</AlertDialogTitle>
            <AlertDialogDescription>
              L&apos;eliminazione delle sessioni è un&apos;operazione
              irreversibile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid={"ButtonCancel"}>Annulla</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                data-testid={"ButtonDelete"}
                className={
                  "bg-destructive text-destructive-foreground hover:bg-destructive"
                }
                onClick={handleDeleteAllChat}
              >
                Elimina
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteChatList;
