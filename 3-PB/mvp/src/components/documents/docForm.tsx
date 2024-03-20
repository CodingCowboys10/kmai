import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addDocumentController } from "@/lib/config/container";
import { useState } from "react";
import { toast } from "sonner";
import { useModel } from "@/providers/model-provider";
import { addDocument } from "@/serverActions/document/addDocument";
import { useDocumentData } from "@/providers/document-provider";
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

function DocForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { model } = useModel();
  const { setIsUpdate } = useDocumentData();

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      event.target.value = null;
      toast.error("Formato del file non supportato");
    }
  };

  const handleFormSubmit = async () => {
    if (selectedFile) {
      const data = new FormData();
      data.set("file", selectedFile);
      data.set("model", model!);

      try {
        await addDocument(data);
        setIsUpdate(true);
        setSelectedFile(null);
      } catch (e) {
        // @ts-ignore
        toast.error(e.message);
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={"flex items-center justify-center mt-5"}
        asChild
      >
        <Button className={"mx-auto"} variant={"default"} size={"lg"}>
          Aggiungi Documento
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className={"text-center"}>
          <AlertDialogTitle className={"text-center"}>
            Trascina o Seleziona il Documento
          </AlertDialogTitle>
          <div className={"h-50"}>
            <Input
              className={"my-5  h-10"}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleFormSubmit}>
            Aggiungi il Documento
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DocForm;
