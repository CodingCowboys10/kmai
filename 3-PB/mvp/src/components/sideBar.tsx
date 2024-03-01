import Settings from "@/components/chat/settings";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function SideBar({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setCollapsed] = useState(false);
  return (
    <div
      className={`relative transition ease-in-out duration-300 flex flex-col min-h-screen bg-accent w-2/12 ${isCollapsed ? "-translate-x-full" : "transition-x-0"}`}
    >
      <div className={"absolute h-full flex items-center -right-10"}>
        <Button
          className={
            "flex items-center bg-background hover:bg-background text-foreground "
          }
          size={"icon"}
          onClick={() => {
            setCollapsed(!isCollapsed);
          }}
        >
          {!isCollapsed ? (
            <svg
              className="with-icon_icon__MHUeb"
              data-testid="geist-icon"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
              style={{
                color: "var(--geist-foreground)",
                width: "24px",
                height: "24px",
              }}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          ) : (
            <svg
              className="with-icon_icon__MHUeb"
              data-testid="geist-icon"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
              style={{
                color: "var(--geist-foreground)",
                width: "24px",
                height: "24px",
              }}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
        </Button>
      </div>
      {children}
      <Settings />
    </div>
  );
}

export default SideBar;
