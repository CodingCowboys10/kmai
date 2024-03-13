import { DocumentInfo, columns } from "./docContent";
import { DataTable } from "./dataTable";
import { getDocumentsController } from "@/lib/config/container";
import { useEffect, useState } from "react";

export default async function DocTable() {
  const [data, setData] = useState([]);

  setData(await (await getDocumentsController.handle("Ollama")).json());

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
