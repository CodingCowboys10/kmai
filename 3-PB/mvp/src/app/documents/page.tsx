"use client";
import React from "react";
import Body from "@/components/body";
import SideBar from "@/components/sideBar";
import DocForm from "@/components/documents/docForm";
import DocTable from "@/components/documents/docTable";
import { DocumentProvider } from "@/providers/document-provider";

export default function App() {
  return (
    <DocumentProvider>
      <Main />
    </DocumentProvider>
  );
}

function Main() {
  return (
    <main className="relative flex flex-row w-full h-full">
      <SideBar>
        <DocForm />
      </SideBar>
      <Body>
        <DocTable />
      </Body>
    </main>
  );
}
