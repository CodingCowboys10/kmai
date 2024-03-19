import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addDocumentController } from "@/lib/config/container";
import { useState } from "react";
import { toast } from "sonner";
import { useModel } from "@/providers/model-provider";
import { addDocument } from "@/serverActions/document/addDocument";
import { useDocumentData } from "@/providers/document-provider";

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
    <div className="p-1 pt-5">
      <div className="grid w-full max-w-sm items-center justify-center gap-1.5 h-full">
        <Label className="text-center w-full">Aggiungi PDF</Label>
        <Input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>
      <Button className="w-full p-1" onClick={handleFormSubmit}>
        Invia
      </Button>
    </div>
  );
}

export default DocForm;
