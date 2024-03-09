"use client";
import { ColumnDef } from "@tanstack/react-table";
import DocAction from "./docAction";

export type DocumentInfo = {
  id: string;
  data: string;
  size: number;
  url: string;
};

export const columns: ColumnDef<DocumentInfo>[] = [
  {
    accessorKey: "id",
    header: "Nome del documento",
  },
  {
    accessorKey: "data",
    header: "Data di inserimento",
  },
  {
    accessorKey: "size",
    header: "Dimensione KB",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const docaction = row.original;

      return <DocAction name={docaction.id} url={docaction.url} />;
    },
  },
];
