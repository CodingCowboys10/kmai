import { DocumentInfo, columns } from "./listDocContent"
import { DataTable } from "./listDocItems"
import {getDocumentsController} from "@/lib/config/container";

async function getData(): Promise<DocumentInfo[]> {

  const res = await getDocumentsController.handle('openAi');
  return await res.json();

}

export default async function ListDoc() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10 overflow-y-scroll">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
