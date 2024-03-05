import { DocumentInfo, columns } from "./listDocContent"
import { DataTable } from "./listDocItems"

async function getData(): Promise<DocumentInfo[]> {
  // Punto in cui dobbiamo usare la route o quello che sarà per prendere i dati
  return [  //dati di prova
    {
        id: "Prova1",
        data: "2024/02/30",
        size: 100.02,
        url: "url del documento per visualizzarlo",
    },
    {
        id: "Prova2",
        data: "2024/02/30",
        size: 100.02,
        url: "url del documento per visualizzarlo",
      },
      {
        id: "Prova3",
        data: "2024/02/30",
        size: 100.02,
        url: "url del documento per visualizzarlo",
      },
      {
        id: "Prova4",
        data: "2024/02/30",
        size: 100.02,
        url: "url del documento per visualizzarlo",
      },
      {
        id: "Prova5",
        data: "2024/02/30",
        size: 100.02,
        url: "url del documento per visualizzarlo",
      },
      {
        id: "Prova6",
        data: "2024/02/30",
        size: 100.02,
        url: "url del documento per visualizzarlo",
      },
      {
        id: "Prova7",
        data: "2024/02/30",
        size: 100.02,
        url: "url del documento per visualizzarlo",
      },
      {
        id: "Prova8",
        data: "2024/02/30",
        size: 100.02,
        url: "url del documento per visualizzarlo",
      },
      {
        id: "Prova9",
        data: "2024/02/30",
        size: 100.02,
        url: "url del documento per visualizzarlo",
      },                                           
    // ...
  ]
}

export default async function ListDoc() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10 overflow-y-scroll">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
