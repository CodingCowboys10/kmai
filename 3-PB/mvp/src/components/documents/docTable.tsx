import { DocumentInfo, columns } from "./docContent";
import { DataTable } from "./dataTable";
import { getDocumentsController } from "@/lib/config/container";
import React, { useEffect, useMemo, useState } from "react";
import { useModel } from "@/providers/model-provider";

export default function DocTable() {
  const [data, setData] = useState<DocumentInfo[]>([]);
  const { model } = useModel();

  useEffect(() => {
    const fetchDocuments = async () => {
      setData(await (await getDocumentsController.handle(model!)).json());
    };
    fetchDocuments().then();
    console.log(data);
  }, [model]);

  /*
  useEffect(() => {
    const fetchDocuments = async () => {
      const res = await fetch("/api/document/getDocuments", {
        method: "POST",
        body: JSON.stringify({ model: model }),
      });
      setData(await res.json());
    };
    fetchDocuments().then();
    console.log(data);
  }, [model]);

   */

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
