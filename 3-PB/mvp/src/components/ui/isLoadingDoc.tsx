import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function IsLoadingDoc() {
  return (
    <>
      <TableRow key={"skeleton-1"} className={"space-y-2"}>
        <TableCell key={1}>
          <Skeleton className="h-10" />
        </TableCell>
        <TableCell key={2}>
          <Skeleton className="h-10" />
        </TableCell>
        <TableCell key={3}>
          <Skeleton className="h-10" />
        </TableCell>
        <TableCell key={4}>
          <Skeleton className="h-10" />
        </TableCell>
      </TableRow>
      <TableRow key={"skeleton-2"} className={"space-y-2"}>
        <TableCell key={1}>
          <Skeleton className="h-10" />
        </TableCell>
        <TableCell key={2}>
          <Skeleton className="h-10" />
        </TableCell>
        <TableCell key={3}>
          <Skeleton className="h-10" />
        </TableCell>
        <TableCell key={4}>
          <Skeleton className="h-10" />
        </TableCell>
      </TableRow>
    </>
  );
}

export default IsLoadingDoc;
