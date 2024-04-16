import { columns } from "./docContent";
import { DataTable } from "./dataTable";
import React from "react";

export default function DocTable() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} />
    </div>
  );
}
