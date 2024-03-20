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
import { getDocumentContent } from "@/serverActions/document/getDocumentContentController";
import { toast } from "sonner";

export default function DocAction({ name }: { name: string }) {
  const { model } = useModel();
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
        <DocActionDelete name={name} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
