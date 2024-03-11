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
import { deleteDocumentController } from "@/lib/config/container";
import { toast } from "sonner";

export default function DocActionDelete({ name }: { name: string }) {
  const handleDelteDoc = async () => {
    const res = await deleteDocumentController.handle(name, "Ollama");
    if (!res.ok) {
      res.json().then((data) => {
        toast.error(data.error);
      });
    } else {
      res.json().then((data) => {
        toast.success(data.message);
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-red-500">
        Elimina
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Conferma eliminazione.</AlertDialogTitle>
          <AlertDialogDescription>
            Eliminando un documento, non potrai più fare domande su di esso.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction
            className={
              "text-destructive-foreground bg-destructive hover:bg-destructive"
            }
            onClick={handleDelteDoc}
          >
            Elimina
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
