"use client";
import React from "react";
import Body from "@/components/body";
import SideBar from "@/components/sideBar";
import DocForm from "@/components/documents/docForm";
import DocTable from "@/components/documents/docTable";

export default function Page() {
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
