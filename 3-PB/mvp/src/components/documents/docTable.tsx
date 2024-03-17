import { DocumentInfo, columns } from "./docContent";
import { DataTable } from "./dataTable";
import React, { useEffect, useState } from "react";
import { useModel } from "@/providers/model-provider";
import { getDocument } from "@/serverActions/document/getDocument";

export default function DocTable() {
  const [data, setData] = useState<DocumentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { model } = useModel();

  useEffect(() => {
    const fetchDocuments = async () => {
      const res = await getDocument(model!);
      setData(res);
    };
    fetchDocuments().then(() => setIsLoading(false));
  }, [model]);

  return (
    <div className="container mx-auto py-10">
      <DataTable isLoading={isLoading} columns={columns} data={data} />
    </div>
  );
}
