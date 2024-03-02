"use client";
import React from "react";
import Body from "@/components/body";
import SideBar from "@/components/sideBar";
import UploadDoc from "@/components/documents/uploadDoc";
import ListDoc from "@/components/documents/listDoc";

export default function Page() {
  return (
    <main className="flex flex-row w-full h-full">
      <SideBar>
        <UploadDoc/>
      </SideBar>
      <Body>
        <ListDoc/>
      </Body>
    </main>
  );
}