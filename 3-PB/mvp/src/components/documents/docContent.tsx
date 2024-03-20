import { ColumnDef } from "@tanstack/react-table";
import DocAction from "./docAction";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
} from "react";
import changeVisibility from "@/serverActions/test/tempVisibility";
import { useDocumentData } from "@/providers/document-provider";

export type DocumentInfo = {
  id: string;
  data: string;
  size: number;
  tag: any;
};

export const columns: ColumnDef<DocumentInfo>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Tag",
    header: "Tag",
    cell: ({ row }) => (
      <div className={"space-x-1 w-fit"}>
        {row.original.tag.map((tagItem: any, index: Key) => (
          <Badge
            variant={tagItem.Value == "visible" ? "default" : "destructive"}
            key={index}
          >
            {tagItem.Value}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "data",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Dimensione kB",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const docaction = row.original;
      return <DocAction name={docaction.id} />;
    },
  },
];
