"use client";

import React from "react";
import ChatBody from "@/components/chat/chatBody";
import SideBar from "@/components/chat/sideBar";

export default function Page() {
  return (
    <main className="flex flex-row w-full h-full">
      <SideBar />
      <ChatBody />
    </main>
  );
}
