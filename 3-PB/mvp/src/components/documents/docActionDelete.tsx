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
import { useModel } from "@/providers/model-provider";

export default function DocActionDelete({ name }: { name: string }) {
  const { model } = useModel();

  const handleDelteDoc = async () => {
    const res = await deleteDocumentController.handle(name, model!);
    const resData = await res.json();
    if (!res.ok) {
      toast.error(resData.message);
    } else {
      toast.success(resData.message);
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
