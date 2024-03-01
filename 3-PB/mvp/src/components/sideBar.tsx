import Settings from "@/components/chat/settings";
import React from "react";

function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col min-h-screen bg-accent w-2/12"}>
      {children}
      <Settings />
    </div>
  );
}

export default SideBar;
