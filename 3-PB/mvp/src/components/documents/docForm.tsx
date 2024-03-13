import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addDocumentController } from "@/lib/config/container";
import { useState } from "react";
import { toast } from "sonner";

function DocForm() {
  const [selectedFile, setSelectedFile] = useState(null);

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
      data.set("model", "Ollama");
      const res = await addDocumentController.handle(data);
      if (!res.ok) {
        res.json().then((data) => {
          toast.error(data.error);
        });
      } else {
        res.json().then((data) => {
          toast.success(data.message);
        });
      }
      setSelectedFile(null);
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
