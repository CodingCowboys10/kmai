import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import DeleteDoc from "./deleteDoc";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IDoc{
    name: string;
    url: string
}

export default function ListDocAction({ name, url }: IDoc) {
  
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
          <DropdownMenuItem
            onClick={() => window.open(url, "_blank")}
          >Visualizza</DropdownMenuItem>
          <DeleteDoc name={name}/>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
