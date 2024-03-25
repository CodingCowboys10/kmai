import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useModel } from "@/providers/model-provider";
import { addDocument } from "@/serverActions/document/addDocument";
import { useDocumentData } from "@/providers/document-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDropzone } from "react-dropzone";
import { Badge } from "@/components/ui/badge";

function DocForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const { model } = useModel();
  const { setIsUpdate } = useDocumentData();

  const onDropAccepted = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles[0].type);
    if (
      acceptedFiles[0] &&
      (acceptedFiles[0].type === "application/pdf" ||
        acceptedFiles[0].type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        acceptedFiles[0].type === "audio/mpeg")
    ) {
      setSelectedFile(acceptedFiles[0]);
      setFileName(acceptedFiles[0].name);
    } else {
      setSelectedFile(null);
      setFileName(null);
    }
  }, []);
  const onDropRejected = useCallback((rejectedFile: any) => {
    toast.error("Formato del file non supportato");
    setSelectedFile(null);
    setFileName(null);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "audio/mpeg": [".mp3"],
    },
  });

  const handleFormSubmit = async () => {
    if (selectedFile) {
      const data = new FormData();
      data.set("file", selectedFile);
      data.set("model", model!);

      try {
        await addDocument(data);
        setIsUpdate(true);
        setSelectedFile(null);
        setFileName(null);
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
      <AlertDialogContent className={"min-w-[800px]"}>
        <AlertDialogHeader className={"text-center"}>
          <AlertDialogTitle className={"text-center"}>
            Aggiungi Documento
          </AlertDialogTitle>
          <>
            <div
              {...getRootProps({
                className: `flex transition-all ease-in-out duration-300 border-dashed border-2 my-2 rounded-md items-center justify-center ${fileName ? "h-0 opacity-0 " : "h-60"}`,
              })}
            >
              <input {...getInputProps()} disabled={fileName !== null} />
              <p>Trascina il file o clicca per cercarlo</p>
            </div>
            {!fileName && (
              <p
                className={"text-sm italic font-medium opacity-30 text-center"}
              >
                {" "}
                File accettati : pdf , docx , mp3.
              </p>
            )}

            {fileName ? (
              <Badge
                className={"px-3.5 py-1.5 w-fit text-sm mx-auto"}
                variant={"secondary"}
              >
                {fileName}
              </Badge>
            ) : (
              ""
            )}
          </>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setSelectedFile(null);
              setFileName(null);
            }}
          >
            Annulla
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleFormSubmit}>
            Aggiungi Documento
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DocForm;
