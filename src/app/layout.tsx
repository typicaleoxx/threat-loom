// defines the root document structure and shared application metadata.
import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import "./globals.css";

/** Defines the default metadata for the Threat Loom application. */
export const metadata: Metadata = {
  title: "Threat Loom",
  description: "Interactive cyber threat intelligence visualization platform",
};

/**
 * Renders the root HTML document for every application route.
 *
 * @param props - Root layout properties supplied by Next.js.
 * @param props.children - Route content rendered inside the document body.
 * @returns The shared HTML document structure.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
