import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "KMAI | Chat",
  description: "Capitolato 1 - IS 2023/2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <> {children} </>;
}
