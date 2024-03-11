import { ColumnDef } from "@tanstack/react-table";
import DocAction from "./docAction";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type DocumentInfo = {
  id: string;
  data: string;
  size: number;
  url: string;
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
    header: "Dimensione",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const docaction = row.original;

      return <DocAction name={docaction.id} url={docaction.url} />;
    },
  },
];
