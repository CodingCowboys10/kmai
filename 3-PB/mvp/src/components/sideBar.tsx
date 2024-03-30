import Settings from "@/components/settings/settings";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function SideBar({
  children,
  isChat,
}: {
  children: React.ReactNode;
  isChat?: boolean;
}) {
  const [isCollapsed, setCollapsed] = useState(false);
  return (
    <div
      className={`p-1 relative transition-all ease-linear duration-150 flex flex-col min-h-screen max-h-screen overflow-hidden bg-accent  ${isCollapsed ? "invisible w-0" : " visible w-2/12"}`}
    >
      <div className={" absolute h-full flex items-center visible -right-10"}>
        <Button
          className={
            "flex items-center bg-background hover:bg-background text-foreground "
          }
          size={"icon"}
          data-testid={"ButtonCollapse"}
          onClick={() => {
            setCollapsed(!isCollapsed);
          }}
        >
          {!isCollapsed ? (
            <svg
              className="with-icon_icon__MHUeb"
              data-testid="isNotCollapsed"
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
              data-testid="isCollapsed"
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
      <Settings isChat={isChat} />
    </div>
  );
}

export default SideBar;
