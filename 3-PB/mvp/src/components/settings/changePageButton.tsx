import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

function ChangePageButton({ to }: { to: string }) {
  return (
    <div className={"flex items-center w-full justify-between "}>
      {to === "chat" ? <h2>Vedi i Documenti</h2> : <h2>Vai alla Chat</h2>}
      <Link href={to === "chat" ? "/documents" : "/chat"} prefetch={false} data-testid={"LinkChange"}>
        <Button variant={"outline"} size={"icon"} data-testid={"ButtonChange"}>
          <ExternalLinkIcon className={"h-5 w-5"} />
        </Button>
      </Link>
    </div>
  );
}

export default ChangePageButton;
