import s from "./layout.module.css";
import "./globals.css";
import type { Metadata } from "next";
import local from "next/font/local";
import { ContextProvider } from "@/context/Store";

const inter = local({
  src: "../components/fonts/Inter-VariableFont_slnt,wght.ttf",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
