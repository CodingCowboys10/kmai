"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24  ">
      <div className={"flex flex-row gap-16"}>
        <Button size={"lg"}>
          <Link href={"documents"}>DOCUMENTS</Link>
        </Button>
        <Button size={"lg"}>
          <Link href={"chat"}>CHAT</Link>
        </Button>
      </div>
    </main>
  );
}
