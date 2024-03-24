import type { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "KMAI | Documents",
  description: "Capitolato 1 - IS 2023/2024",
};

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <> {children} </>;
}
