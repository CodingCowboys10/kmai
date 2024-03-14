import { DocumentInfo, columns } from "./docContent";
import { DataTable } from "./dataTable";
import React, { useEffect, useMemo, useState } from "react";
import { useModel } from "@/providers/model-provider";

export default function DocTable() {
  const [data, setData] = useState<DocumentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { model } = useModel();

  useEffect(() => {
    const fetchDocuments = async () => {
      const res = await fetch("/api/document/getDocuments", {
        method: "POST",
        body: JSON.stringify({ model: model }),
      });
      setData(await res.json());
    };
    fetchDocuments().then(() => setIsLoading(false));
  }, [model]);

  return (
    <div className="container mx-auto py-10">
      <DataTable isLoading={isLoading} columns={columns} data={data} />
    </div>
  );
}
