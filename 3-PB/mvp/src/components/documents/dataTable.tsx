import React, { useState } from "react";
import {
  MixerHorizontalIcon,
  CalendarIcon,
  TextAlignLeftIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/documents/dataTablePagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import IsLoadingDoc from "@/components/ui/isLoadingDoc";
import { Button } from "@/components/ui/button";
import { useDocumentData } from "@/providers/document-provider";
import { DataTableViewOptions } from "@/components/documents/dataTableViewOption";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const { data, isLoading } = useDocumentData();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [isFilterData, setIsFilterData] = useState(false);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    // @ts-ignore
    data,
    // @ts-ignore
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, columnFilters, columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div>
      <div className="flex justify-between py-4 items-center ">
        <div className={"flex justify-start w-full space-x-4"}>
          <Input
            data-testid={"InputBarraRicerca"}
            placeholder={`Cerca per ${!isFilterData ? "nome" : "data"}...`}
            value={
              (table
                .getColumn(`${!isFilterData ? "id" : "data"}`)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(`${!isFilterData ? "id" : "data"}`)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" data-testid={"SettingsBarraRicerca"}>
                <MixerHorizontalIcon className={"w-4 h-4"} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"center"}>
              <DropdownMenuLabel> Cerca per </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsFilterData(false);
                  table.getColumn("data")?.setFilterValue(null);
                }}
                asChild
              >
                <div className={"flex justify-between"}>
                  Nome
                  <TextAlignLeftIcon />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsFilterData(true);
                  table.getColumn("id")?.setFilterValue(null);
                }}
                asChild
              >
                <div className={"flex justify-between"}>
                  Data
                  <CalendarIcon />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DataTableViewOptions table={table} data-testid={"DataTableViewOptions"} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && <IsLoadingDoc />}
            {!isLoading && table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : !isLoading && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Nessun documento.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} data-testid={"DataTablePagination"}  />
    </div>
  );
}
