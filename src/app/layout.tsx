import s from "./layout.module.css";
import "./globals.css";
import type { Metadata } from "next";
import local from "next/font/local";
import { ContextProvider } from "@/context/Store";

const inter = local({
  src: "../components/fonts/Inter-VariableFont_slnt,wght.ttf",
});

export const metadata: Metadata = {
  title: "Sewu Project App",
  description: "Simple Project Management Tools: Quick & Easy",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/sewu.svg" sizes="any" />
      </head>
      <body className={inter.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
