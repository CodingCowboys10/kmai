import { ColumnDef } from "@tanstack/react-table";
import DocAction from "./docAction";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Key } from "react";

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
        {row.original.tag
          .map((tagItem: any, index: Key) => {
            return (
              <>
                {tagItem.Key === "visibility" && (
                  <Badge
                    variant={
                      tagItem.Value === "true" ? "default" : "destructive"
                    }
                    key={index}
                  >
                    {tagItem.Value === "true" ? "Visible" : "Invisible"}
                  </Badge>
                )}
                {tagItem.Value === "true" && tagItem.Key !== "visibility" && (
                  <Badge variant={"secondary"} key={index}>
                    {tagItem.Key}
                  </Badge>
                )}
              </>
            );
          })
          .reverse()}
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
      return (
        <DocAction
          name={row.original.id}
          visibility={
            row.original.tag[row.original.tag.length - 1].Value == "visible"
          }
        />
      );
    },
  },
];
