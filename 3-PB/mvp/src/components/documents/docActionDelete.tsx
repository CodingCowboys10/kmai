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
import { useModel } from "@/providers/model-provider";
import { useDocumentData } from "@/providers/document-provider";
import { deleteDocument } from "@/serverActions/document/deleteDocument";

export default function DocActionDelete({ name }: { name: string }) {
  const { model } = useModel();
  const { setIsUpdate } = useDocumentData();

  const handleDelteDoc = async () => {
    try {
      await deleteDocument({ name, model });
      setIsUpdate(true);
    } catch (e) {
      // @ts-ignore
      toast.error(e.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger data-testid={"AllDiaTrigger"} className="w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-red-500">
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
          <AlertDialogCancel data-testid={"AllDiaCancel"}>Annulla</AlertDialogCancel>
          <AlertDialogAction data-testid={"AllDiaDelete"} 
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
