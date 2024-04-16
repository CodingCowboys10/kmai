import React from "react";

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col min-h-screen p-2 gap-2 items-center max-w-full w-full`}
    >
      {children}
    </div>
  );
}
export default Body;
