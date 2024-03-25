import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DocActionDelete from "./docActionDelete";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModel } from "@/providers/model-provider";
import { getDocumentContent } from "@/serverActions/document/getDocumentContent";
import { toast } from "sonner";
import { updateDocument } from "@/serverActions/document/updateDocument";
import { useDocumentData } from "@/providers/document-provider";
import { useState } from "react";

export default function DocAction({
  name,
  visibility,
}: {
  name: string;
  visibility: boolean;
}) {
  const { model } = useModel();
  const { setIsUpdate } = useDocumentData();
  const [isVisible, setIsVisible] = useState(visibility);
  const handleShowDoc = async () => {
    try {
      const url = await getDocumentContent(name, model!);
      window.open(url, "_blank");
    } catch (e) {
      // @ts-ignore
      toast.error(e.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Azioni</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Azioni</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleShowDoc}>Visualizza</DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            try {
              console.log(isVisible);
              setIsUpdate(true);
              setIsVisible(!isVisible);
              await updateDocument(name, model, {
                visibility: !isVisible,
              });
            } catch (e) {
              // @ts-ignore
              toast.error(e.message);
            }
          }}
        >
          Cambia Visibilità
        </DropdownMenuItem>

        <DocActionDelete name={name} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
