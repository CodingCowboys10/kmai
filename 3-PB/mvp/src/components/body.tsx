import React from "react";

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col min-h-screen w-full p-2 gap-2 items-center"}>
      {children}
    </div>
  );
}
export default Body;
