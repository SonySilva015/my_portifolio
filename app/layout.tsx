import type { Metadata } from "next";

import Nav from "@/components/content/nav";
import Gobla from "@/components/gobla";
import "./globals.css";


export const metadata: Metadata = {
  title: "Sony Cassungulo - dev",
  description: "Portfólio pessoal de Sony Cassungulo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={''}
        style={{ fontFamily: 'Poppins' }}
      >
        <Gobla />
        <Nav />
        {children}
      </body>
    </html>
  );
}
