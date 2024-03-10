import { DocumentInfo, columns } from "./docContent";
import { DataTable } from "./dataTable";
import { getDocumentsController } from "@/lib/config/container";

async function getData(): Promise<DocumentInfo[] | []> {
  const res = await getDocumentsController.handle("openAi");
  if (res.ok) return await res.json();
  else return [];
}

export default async function DocTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 overflow-y-scroll">
      <DataTable columns={columns} data={data} />
    </div>
  );
}