import { DocumentInfo, columns } from "./docContent";
import { DataTable } from "./dataTable";
import React, { useEffect, useState } from "react";
import { useModel } from "@/providers/model-provider";
import { getDocument } from "@/serverActions/document/getDocument";

export default function DocTable() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} />
    </div>
  );
}
