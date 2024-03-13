import { DocumentInfo, columns } from "./docContent";
import { DataTable } from "./dataTable";
import { getDocumentsController } from "@/lib/config/container";

export default async function DocTable() {
  const data = await (await getDocumentsController.handle("Ollama")).json();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
